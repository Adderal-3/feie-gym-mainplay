# 江湖布坊 Q版美术制作记录

使用内置 image_gen，根据用户提供的《逆水寒》游历聊天室截图建立同一套2D Q版绘画语言。以下为生成提示词；这些图片是新制作的改编素材，不是官方游历原始sprite。未使用真人照片、3D人像或前一版写实场景。人物和道具由CSS按图集格读取，未二次绘改原图。

## 场景

Use case: stylized-concept
Asset type: mobile game environment background, portrait 3:4, no UI.
Reference image: the attached screenshot is ONLY the style reference. Match its simple 2D Chinese chibi game room drawing exactly in visual language: crisp dark brown outlines, warm flat cel colors, compact isometric wooden furniture. Do not copy its text or people.
Primary request: draw the playable clothing workshop interior for a cute wuxia crafting game, in that reference's hand-drawn chibi game art style. A small cozy Song dynasty wooden clothing shop, three-quarter isometric view, whole room visible: left wall shelves with folded blue, cream and muted red fabric; tall vertical fabric bolts at back; a wood cutting counter with a dark blue cloth mat and small scissors at middle; a compact wooden loom behind; hanging simple hanfu at right; sewing stool and low tea tray near front. A few small flowers in a ceramic vase. Clear open wood floor near front for two little characters to stand. Charming practical objects at consistent scale. Similar copper-brown wood and slate-blue textile palette as reference.
Rendering: precise clean 2D game background, dark ink contours, flat base colors, ONE simple shadow tone, sparse wood grain lines. Every object readable at mobile size. NOT 3D, NOT realistic, NOT painterly, NOT a cinematic concept painting, NOT ornate AI fantasy architecture. No excessive decorative clutter or microtexture. No people, no geese, no text, no buttons, no interface, no watermark. The entire image must feel like an actual cute illustrated game scene, not a poster.

## 人物图集（3×2）

Use case: stylized-concept
Asset type: one game character sprite atlas, transparent background, 3 columns x 2 rows of equal square tiles.
Reference: attached screenshot is the exact target drawing style and proportions. Draw ORIGINAL chibi wuxia clothing-shop characters in that visual language. Match the tiny bean-shaped dark eyes, large round head, short little body, very simple tiny hands, almost no nose or mouth, clear dark brown/black contours, flat muted cel shading. All characters approximately TWO HEADS tall, not anime teens or realistic people. Hair is simple broad black or ivory shapes, no wispy rendered strands. Clothes have a few clean costume lines, no excessive jewelry.
Atlas layout: exactly 6 separate full-body sprites in a uniform 3-column 2-row grid. Each fully contained in its own square tile with transparent margins and no contact or overlap. Same scale and a mild three-quarter stance, facing slightly left. Nothing else in tiles, no shadows on ground, no labels, no text.
Tile order row major:
1. young black-haired woman with soft twin side buns, slate blue and cream hanfu and short rust-brown tailor apron, small scissors at waist; keeper.
2. pale ivory-haired little wuxia swordswoman in brown and cream layered travel clothes, tiny dark belt and hair ornaments, similar to white-haired chibi in screenshot; visiting swordswoman.
3. black-haired girl with a green ribbon side bun, pale green and cream clothes with a small cloth medicine pouch; apothecary friend.
4. black-haired man with a high short ponytail, muted blue short outer robe and warm brown belt, simple dark boots; ferryman.
5. grey-haired kindly older woman with a low bun, tan and cream apron clothes, tiny dark eyes and simple face; senior tailor.
6. black-haired young apprentice with one little bun, muted peach and cream short robe and a slate blue needle pouch; apprentice.
Avoid: any realistic face, 3D modeling, glamour face, human photo look, shiny skin, gradients, diffuse cinematic lighting, painterly textures, huge sparkly anime eyes, geese, cats, scenery, borders, text, watermark. Only clean 2D cute game sprites with true alpha transparency.

## 道具图集（6×6）

Use case: stylized-concept
Asset type: one coherent 2D item sprite atlas, exactly 6 columns by 6 rows, square canvas, transparent background.
Style reference is the attached chibi game screenshot. Match its crisp dark-brown outlines, compact friendly Chinese game props, warm muted flat colors with just one cel-shadow tone. Small readable objects, simple controlled detail. NO realism, NO 3D, NO shiny rendered inventory icons, NO AI microtexture. Same lineweight for every item.
Layout: exactly thirty-six distinct isolated objects, evenly spaced in a strict SIX by SIX grid. Every tile the same size, object centered, transparent margin around it. No overlaps. No tile borders, no labels, no letters or numbers, no backdrop, NO ground shadows or glow. Preserve true hard-edge alpha around each sprite.
Row-major object order:
ROW 1: 1 small bamboo needle box; 2 open sewing toolkit with scissors; 3 compact wooden loom; 4 wooden spinning wheel; 5 round indigo dye vat; 6 round wooden embroidery hoop with flower cloth.
ROW 2: 1 small cream cotton scraps; 2 neatly folded cream cloth pad; 3 rolled cream silk; 4 folded slate blue silk bolt; 5 folded blue cloth with small gold flower embroidery; 6 two small thread spools cream and blue.
ROW 3: 1 two long sewing needles; 2 little brass scissors; 3 coiled measuring tape; 4 three carved jade buttons; 5 a rust-red hanging tassel; 6 cream medicine sachet with green ties.
ROW 4: 1 simple cream short hanfu top; 2 slate-blue long hanfu robe on tiny hanger; 3 rust-brown tailor apron; 4 pale peach long hanfu dress on tiny hanger; 5 folded short dark blue cloak; 6 one pair of little cream cloth shoes.
ROW 5: 1 three wooden planks; 2 small hanging warm paper lantern; 3 small potted flowering branch; 4 coil of thick tan hemp rope; 5 folded oiled raincloth; 6 small cloth rain awning on two wood posts.
ROW 6: 1 small pile of Chinese square-hole copper coins; 2 small green jade pendant; 3 a little celadon tea pot; 4 closed blue thread-bound pattern book; 5 three beige paper vouchers with rust ribbon and NO writing; 6 small closed brown wooden gift chest.
Constraints: the atlas is a production game sprite sheet; exact strict grid is essential, no decorative composition. Cute hand-drawn objects must read clearly at 48px. No human faces, no geese, no words, no watermark.


## 雨夜开场／修缮前场景

Use case: precise-object-edit
Asset type: opening-state background for the SAME cute 2D clothing workshop.
Edit target: attached workshop painting. Keep camera, isometric geometry, exact furniture positions, all object scale, crisp brown outlines and flat cel shading. Do NOT redraw in another style.
Change only workshop condition to BEFORE the repairs in a rainy-night opening: the front cutting counter is old with one visibly loose plank, empty fabric slots on left shelves, a few bundled cloth parcels and loose scraps on the front floor, simple hanging dust sheets partly over the loom and clothes rack, a small crack in the upper wooden roof with a few drawn rain drops coming down, two shallow puddles near the right wall, unlit hanging lantern, window outside dark muted blue. Keep the layout readable and charming, not ruined or scary. The same lower-front open floor must stay clear for the chibi people. Keep muted warm wood and slate blue cloth colors, subdued evening light in FLAT 2D colors, no cinematic lighting or realistic water. No people, no new buildings, no interface, no text, no labels, no watermark.
