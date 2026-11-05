from pathlib import Path
import math, json, shutil
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor, Color, white
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'assets'
OUT = ROOT / '江湖布坊_集市衣铺经营策划案.pdf'
W, H = 1190, 842
BG='#F8F5EF'; INK='#363E3B'; MUTED='#747B73'; ACC='#718983'; RED='#9A756C'; LINE='#D6CFC2'; PALE='#EEE9DF'; BLUE='#87949C'
pdfmetrics.registerFont(TTFont('CN', 'C:/Windows/Fonts/msyh.ttc', subfontIndex=0))
pdfmetrics.registerFont(TTFont('CNB', 'C:/Windows/Fonts/msyhbd.ttc', subfontIndex=0))
pdfmetrics.registerFont(TTFont('SERIF', 'C:/Windows/Fonts/STSONG.TTF'))
pdfmetrics.registerFontFamily('CN',normal='CN',bold='CNB',italic='CN',boldItalic='CNB')
c = canvas.Canvas(str(OUT), pagesize=(W,H))
c.setTitle('江湖布坊 逆水寒手游集市主题小游戏策划案')
c.setAuthor('江湖布坊项目')
c.setSubject('合成经营 夜市委托 新衣上架')
page=0
issues=[]

def rect(x,y,w,h,fill=white,stroke=None,r=0,lw=1):
    c.setFillColor(HexColor(fill) if isinstance(fill,str) else fill)
    c.setStrokeColor(HexColor(stroke or fill) if isinstance(stroke or fill,str) else (stroke or fill))
    c.setLineWidth(lw)
    if r: c.roundRect(x,H-y-h,w,h,r,stroke=bool(stroke),fill=1)
    else: c.rect(x,H-y-h,w,h,stroke=bool(stroke),fill=1)

def text(x,y,s,size=16,color=INK,font='CN',align='left'):
    c.setFillColor(HexColor(color)); c.setFont(font,size)
    if align=='center': c.drawCentredString(x,H-y-size*.86,s)
    elif align=='right': c.drawRightString(x,H-y-size*.86,s)
    else: c.drawString(x,H-y-size*.86,s)

def para(x,y,w,s,size=15,leading=None,color=INK,font='CN',maxh=None):
    style=ParagraphStyle('p',fontName=font,fontSize=size,leading=leading or size*1.62,textColor=HexColor(color),wordWrap='CJK',spaceAfter=0,allowWidows=0,allowOrphans=0)
    p=Paragraph(s,style); _,h=p.wrap(w,1000)
    if maxh is not None and h>maxh+.5: issues.append({'page':page,'text':s[:35],'height':h,'allowed':maxh})
    p.drawOn(c,x,H-y-h)
    return y+h

def line(x1,y1,x2,y2,color=LINE,lw=1):
    c.setStrokeColor(HexColor(color));c.setLineWidth(lw);c.line(x1,H-y1,x2,H-y2)

def arrow(x1,y1,x2,y2,color=ACC,lw=1.8):
    line(x1,y1,x2,y2,color,lw)
    a=math.atan2(y2-y1,x2-x1)
    for da in (-.5,.5): line(x2,y2,x2-7*math.cos(a+da),y2-7*math.sin(a+da),color,lw)

def picture(name,x,y,w,h):
    path=ASSETS/name
    if not path.exists():
        raise FileNotFoundError(path)
    iw,ih=Image.open(path).size
    scale=max(w/iw,h/ih);dw,dh=iw*scale,ih*scale
    c.saveState()
    clip=c.beginPath();clip.rect(x,H-y-h,w,h);c.clipPath(clip,stroke=0,fill=0)
    c.drawImage(ImageReader(str(path)),x+(w-dw)/2,H-y-h+(h-dh)/2,dw,dh,mask='auto')
    c.restoreState()

def label(x,y,s,color=ACC): text(x,y,s,12,color,'CNB')

def tag(x,y,s,w=None,fill=PALE,color=MUTED):
    w=w or pdfmetrics.stringWidth(s,'CN',11)+24
    rect(x,y,w,25,fill,r=5); text(x+12,y+6,s,11,color)

def section(x,y,title): text(x,y,title,20,INK,'CNB')

def page_start(title,sub,chapter):
    global page
    if page: c.showPage()
    page+=1
    rect(0,0,W,H,BG)
    text(46,27,'江湖布坊  /  集市主题小游戏',11,MUTED)
    text(W-46,27,chapter,11,MUTED,align='right')
    text(46,62,title,32,INK,'CNB')
    para(46,112,1098,sub,14,21,MUTED,maxh=43)
    line(46,801,W-46,801)
    text(46,813,'江湖布坊  ·  玩法与场景方案  ·  2026年11月5日',10,MUTED)
    text(W-46,811,f'{page:02d} / 07',12,MUTED,align='right')

def icon(kind,x,y,s=62,color=ACC):
    c.saveState(); c.translate(x,H-y-s); c.scale(s/64,s/64)
    c.setStrokeColor(HexColor(color));c.setFillColor(HexColor(PALE));c.setLineWidth(2)
    if kind=='cloth':
        c.roundRect(7,14,45,35,5,fill=1,stroke=1);c.ellipse(7,38,52,54,fill=1,stroke=1)
        c.line(19,17,19,41);c.line(32,17,32,40);c.line(43,17,43,42)
    elif kind=='merge':
        c.roundRect(2,18,21,25,3,fill=1,stroke=1);c.roundRect(40,18,21,25,3,fill=1,stroke=1)
        c.line(26,30,36,30);c.line(31,25,31,35)
        c.line(12,49,50,49);c.line(45,45,50,49);c.line(45,53,50,49)
    elif kind=='order':
        c.roundRect(13,6,38,51,4,fill=1,stroke=1)
        for yy in [43,35,27]:c.line(20,yy,44,yy)
        c.circle(32,15,7,fill=1,stroke=1)
    elif kind=='cabinet':
        c.roundRect(7,7,50,49,3,fill=1,stroke=1);c.line(32,10,32,53)
        c.circle(27,31,2,fill=0,stroke=1);c.circle(37,31,2,fill=0,stroke=1)
        c.line(10,4,10,9);c.line(53,4,53,9)
    elif kind=='poster':
        c.roundRect(10,5,43,53,3,fill=1,stroke=1);c.rect(17,24,29,22,fill=0,stroke=1)
        c.line(18,17,45,17);c.line(18,12,38,12)
    elif kind=='pin':
        c.line(15,7,45,45);c.line(20,4,49,42);c.circle(45,47,8,fill=1,stroke=1)
    elif kind=='bag':
        c.roundRect(13,9,38,37,8,fill=1,stroke=1);c.line(17,47,47,47)
        c.line(22,48,18,58);c.line(41,48,46,58)
    c.restoreState()

def table(x,y,width,widths,heads,rows,fs=13,rowpad=11,header=34):
    ws=[v/sum(widths)*width for v in widths]
    rect(x,y,width,header,'#DFE7E3',LINE)
    xx=x
    for s,ww in zip(heads,ws):text(xx+11,y+10,s,fs,INK,'CNB');xx+=ww
    yy=y+header
    for rid,row in enumerate(rows):
        heights=[]
        for ss,ww in zip(row,ws):
            p=Paragraph(ss,ParagraphStyle('t',fontName='CN',fontSize=fs,leading=fs*1.5,wordWrap='CJK'))
            heights.append(p.wrap(ww-22,1000)[1])
        rh=max(heights)+2*rowpad
        rect(x,yy,width,rh,'#FFFFFF' if rid%2==0 else '#F0EEE7',LINE)
        xx=x
        for ss,ww in zip(row,ws):
            para(xx+11,yy+rowpad,ww-22,ss,fs,fs*1.5);xx+=ww
        yy+=rh
    xx=x
    for ww in ws[:-1]:xx+=ww;line(xx,y,xx,yy,LINE,.6)
    return yy

def bullet(x,y,w,title,body):
    text(x,y,title,17,INK,'CNB')
    return para(x,y+29,w,body,14,22)+20
