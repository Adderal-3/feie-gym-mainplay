(function () {
  'use strict';
  const messages = [];
  const report = (message, detail) => {
    const line = String(message) + (detail ? '\n' + String(detail.stack || detail) : '');
    messages.push(line);
    window.__ORIGINAL_DIAGNOSTICS__ = messages;
    document.getElementById('diagnostic').textContent = messages.slice(-10).join('\n');
    if (detail) document.getElementById('diagnostic').classList.remove('ready');
    console.log('[local original]', line);
  };
  window.addEventListener('error', e => report(e.message, e.error));
  window.addEventListener('unhandledrejection', e => report('Promise rejected', e.reason));
  window.__reportOriginal = report;
  const noop = () => undefined;
  const proxy = new Proxy(function () { return proxy; }, {
    get(_target, name) {
      if (name === 'then') return undefined;
      if (name === Symbol.toPrimitive) return () => '';
      if (name === 'toJSON') return () => null;
      if (name === 'hasOwnProperty') return () => false;
      if (name === 'isInLive') return () => Promise.resolve(false);
      if (typeof name === 'string' && (/^is[A-Z_]/.test(name) || ['enabled','debug','isInitialized'].includes(name))) return false;
      return proxy;
    },
    apply() { return proxy; },
  });
  // The vendor SDK is deliberately absent. This neutral object only permits
  // static class registration; no SDK login, telemetry or remote call runs.
  window.HSDK = proxy;
  window.GameGlobal = window;
  window.CDNS = [location.origin];
  window.global = window;
  window.__globalAdapter = { isSubContext: false, init: noop, adaptEngine: noop };
  window.require = name => { throw new Error('Runtime module not available in browser: ' + name); };
  window.__cocos_require__ = noop;
  function script(url) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = url;
      s.onload = resolve;
      s.onerror = () => reject(new Error('Script could not load: ' + url));
      document.head.appendChild(s);
    });
  }
  function loadBundle(name) {
    return new Promise((resolve, reject) => cc.assetManager.loadBundle(name, (e, b) => e ? reject(e) : resolve(b)));
  }
  function load(bundle, asset, type) {
    return new Promise((resolve, reject) => bundle.load(asset, type, (e, a) => e ? reject(e) : resolve(a)));
  }
  window.__originalLoadBundle = loadBundle;
  window.__originalLoad = load;
  async function start() {
    report('加载原 Cocos 2.4.9 引擎');
    await script('/client/cocos/cocos2d-js-min.js');
    await script('/client/src/settings.js');
    const settings = window._CCSettings;
    settings.server = location.origin;
    settings.subpackages = [];
    report('注册原游戏类');
    await script('/original/instrumented-game.js');
    const api = window.__ORIGINAL__;
    if (!api) throw new Error('Original client bindings were not registered');
    // The original native boot installs this hook before deserializing cached
    // Spine nodes. Preserve that order so its cache constructor is captured.
    if (api.LD) api.LD();
    window.__originalSettings = settings;
    cc.assetManager.init({
      bundleVers: settings.bundleVers,
      remoteBundles: settings.remoteBundles,
      subpackages: [],
      server: location.origin,
    });
    const originalScriptDownload = cc.assetManager.downloader._downloaders['.js'];
    cc.assetManager.downloader.register('.js', (url, options, complete) => {
      const parsed = new URL(url, location.href);
      if (parsed.origin !== location.origin) return complete(new Error('External script blocked'));
      if (/\/(?:assets|remote)\/.+\/index(?:\.[a-z\d]+)?\.js$/i.test(parsed.pathname)) return complete(null, null);
      return originalScriptDownload(url, options, complete);
    });
    function installDecodedTextures() {
      const imageDownloader = cc.assetManager.downloader._downloaders['.png'];
      const imageParser = cc.assetManager.parser._parsers?.['.png'] || cc.assetManager.parser.parseImage;
      const decodedImages = window.__ORIGINAL_DECODED_IMAGES__ || (window.__ORIGINAL_DECODED_IMAGES__ = new WeakSet());
      if (!cc.Texture2D.prototype.__localOriginalImageFormat) {
        const nativeInitWithElement = cc.Texture2D.prototype.initWithElement;
        cc.Texture2D.prototype.initWithElement = function (image) {
          // Original serialized textures select PVRTC/ASTC formats. Their local
          // decoded PNG pixels are RGBA, so keep the pixels and correct only the
          // GPU upload format for images produced by this compatibility loader.
          if (image && decodedImages.has(image)) this._format = cc.Texture2D.PixelFormat.RGBA8888;
          return nativeInitWithElement.apply(this, arguments);
        };
        cc.Texture2D.prototype.__localOriginalImageFormat = true;
      }
      cc.assetManager.downloader.register('.pvr', (url, options, complete) => {
        const parsed = new URL(url, location.href);
        if (parsed.origin !== location.origin) return complete(new Error('External texture blocked'));
        let finished = false;
        const once = (error, image) => { if (!finished) { finished = true; complete(error, image); } };
        if (imageDownloader) return imageDownloader('/decoded' + parsed.pathname, options, once);
        const image = new Image();
        image.onload = () => { image.onload = image.onerror = null; once(null, image); };
        image.onerror = () => { image.onload = image.onerror = null; once(new Error('Missing decoded original texture: ' + parsed.pathname)); };
        image.src = '/decoded' + parsed.pathname;
      });
      cc.assetManager.parser.register('.pvr', (image, options, complete) => {
        const diagnostics = window.__ORIGINAL_IMAGE_DIAGNOSTICS__ || (window.__ORIGINAL_IMAGE_DIAGNOSTICS__ = []);
        const entry = {inputType:image?.constructor?.name,width:image?.width,naturalWidth:image?.naturalWidth,keys:Object.keys(image||{}).slice(0,8)};
        if(diagnostics.length<12){diagnostics.push(entry);console.log('[local original image input]',JSON.stringify(entry));}
        // Browser Cocos may download PNG as Blob for ImageBitmap decoding.
        // Use its original PNG parser rather than passing that Blob to Texture2D.
        if(imageParser) return imageParser(image, options, (error, parsed) => {
          entry.outputType=parsed?.constructor?.name;entry.outputWidth=parsed?.width;
          if(!error && parsed && typeof parsed === 'object') decodedImages.add(parsed);
          complete(error,parsed);
        });
        if(image && typeof image === 'object') decodedImages.add(image);
        complete(null,image);
      });
    }
    installDecodedTextures();
    // Match the recovered boot order: internal effect/material definitions must
    // exist before Cocos initializes renderer built-ins in cc.game.run.
    report('预载原引擎内置资源');
    await Promise.all([loadBundle('internal'), loadBundle('resources'), loadBundle('main')]);
    cc.game.run({
      id: 'GameCanvas', debugMode: cc.debug.DebugMode.INFO, showFPS: false, frameRate: 60,
      groupList: settings.groupList, collisionMatrix: settings.collisionMatrix,
    }, async function () {
      try {
        // Original engine initialization installs its ASTC parser in renderer-
        // initialization hooks. Override only after those hooks have completed.
        installDecodedTextures();
        cc.view.enableRetina(true);
        cc.view.resizeWithBrowserSize(true);
        cc.view.setDesignResolutionSize(750, 1334, cc.ResolutionPolicy.SHOW_ALL);
        const scene = new cc.Scene();
        scene.name = 'LocalOriginalScene';
        const canvas = new cc.Node('Canvas');
        canvas.setContentSize(750, 1334);
        // Exact Canvas translation from the recovered main.fire scene. Cocos
        // touch coordinates use bottom-left world coordinates; retaining this
        // original translation makes visual and touch hit-test spaces agree.
        canvas.setPosition(375, 667);
        const layout = canvas.addComponent(cc.Canvas);
        layout.designResolution = cc.size(750, 1334);
        layout.fitWidth = true;
        layout.fitHeight = false;
        scene.addChild(canvas);
        cc.director.runSceneImmediate(scene);
        window.__ORIGINAL_CANVAS__ = canvas;
        report('加载原资源与界面');
        const bundle = await loadBundle('gameAsset');
        const modalBlocker = await load(bundle, 'Common/UI/modalBlocker', cc.Prefab);
        if (api.We) {
          const appEngine = canvas.addComponent(api.We);
          appEngine.modalBlocker = modalBlocker;
          appEngine.engineStart();
          window.__ORIGINAL_APP_ENGINE__ = appEngine;
        } else if (api.Ne?.initialize) api.Ne.initialize(canvas, modalBlocker);
        await Promise.all([loadBundle('remoteAsset'), loadBundle('zh')]);
        await script('/original/local-backend.js');
        await script('/original/story-profile.js');
        if (!window.initializeOriginalSession) {
          await script('/original/local-session.js');
        }
        const session = await window.initializeOriginalSession(api);
        window.__ORIGINAL_SESSION__ = session;
        await script('/original/preload.js');
        await window.preloadOriginalMainplay(api);
        await script('/original/runtime-services.js');
        await window.initializeOriginalRuntimeServices(api);
        await script('/original/story-flow.js');
        await script('/original/home-setup.js');
        await window.setupOriginalHome(api, { canvas });
        const prefab = await load(bundle, 'Prefab/UI/Merge/MergeScreen', cc.Prefab);
        const view = cc.instantiate(prefab);
        view.active = false;
        const screenLayer = api.Ne?.getLayer?.(api.Be?.SCREEN ?? 'SCREEN') || canvas;
        screenLayer.addChild(view);
        view.setPosition(0, 0);
        window.__ORIGINAL_VIEW__ = view;
        if (session?.beforeMount) await session.beforeMount(view, canvas);
        if (session?.afterMount) await session.afterMount(view, canvas);
        report('原标准剧情与玩法入口已加载');
        window.__ORIGINAL_READY__ = true;
        if (!new URLSearchParams(location.search).has('log')) document.getElementById('diagnostic').classList.add('ready');
      } catch (e) { report('启动失败', e); }
    });
  }
  start().catch(e => report('启动失败', e));
})();
