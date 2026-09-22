"""サイトのOGP画像とファビコンを生成する。

配色は globals.css の @theme と揃えている。変更するときは両方直すこと。
  flame-500 #027ddb  アクセント
  flame-800 #013b9e  深い青
  line      #06c755  LINE緑

OGPはX・LINE・Slackなどでリンクを貼ったときに表示されるカード。
サイトの第一印象がここで決まるので、配色を変えたら必ず作り直す。
"""

import os

from PIL import Image, ImageDraw, ImageFont

FONT = "/usr/share/fonts/opentype/ipafont-gothic/ipag.ttf"
PUB = "/home/user/itsaiyou/public"

DEEP_FROM = (0x01, 0x3B, 0x9E)
DEEP_TO = (0x01, 0x68, 0xC2)
ACCENT = (0x02, 0x7D, 0xDB)
ACCENT_LIGHT = (0x7C, 0xC0, 0xF7)
PALE = (0xDB, 0xEE, 0xFF)
WHITE = (0xFF, 0xFF, 0xFF)


def font(size):
    return ImageFont.truetype(FONT, size)


def diagonal_gradient(size, c0, c1):
    """左上から右下へのグラデーション。CSSの bg-deep と向きを揃える。"""
    w, h = size
    small = Image.new("RGB", (64, 64))
    px = small.load()
    for y in range(64):
        for x in range(64):
            t = (x * 0.45 + y * 0.55) / 63
            px[x, y] = tuple(round(c0[i] + (c1[i] - c0[i]) * t) for i in range(3))
    return small.resize((w, h), Image.BICUBIC)


def grid(d, w, h, step=60, alpha=7):
    """ごく薄い方眼。強く出すと方眼紙に見えるので、輪郭が分かる程度に留める。"""
    base = (0x01, 0x50, 0xB0)
    line = tuple(round(c + (255 - c) * alpha / 255) for c in base)
    for x in range(0, w, step):
        d.line([(x, 0), (x, h)], fill=line, width=1)
    for y in range(0, h, step):
        d.line([(0, y), (w, y)], fill=line, width=1)


def make_ogp():
    W, H = 1200, 630
    img = diagonal_gradient((W, H), DEEP_FROM, DEEP_TO)
    d = ImageDraw.Draw(img)
    grid(d, W, H)

    L = 78

    # 上部のラベル（角丸の枠）
    label = "学歴不問・IT未経験専門のキャリア相談窓口"
    f_label = font(25)
    lw = d.textlength(label, font=f_label)
    d.rounded_rectangle(
        [L, 72, L + lw + 56, 72 + 52], radius=26, outline=ACCENT_LIGHT, width=2
    )
    d.text((L + 28, 72 + 26), label, font=f_label, fill=ACCENT_LIGHT, anchor="lm")

    # 主見出し
    f_h = font(62)
    d.text((L, 214), "「自分なんて、IT業界とは", font=f_h, fill=WHITE, anchor="lm")
    d.text((L, 296), "無縁だ」と思っている人へ。", font=f_h, fill=WHITE, anchor="lm")

    # 補足
    f_p = font(27)
    d.text((L, 388), "高卒でも、専門卒でも、フリーターでも。", font=f_p, fill=PALE,
           anchor="lm")
    d.text((L, 432), "相談は何度でも無料、費用の負担はありません。", font=f_p,
           fill=PALE, anchor="lm")

    # 下部の3つの数字
    stats = [("0円", "相談・紹介の費用"), ("学歴不問", "扱う求人の中心"),
             ("3ルート", "未経験からの入口")]
    x = L
    for value, caption in stats:
        # 数字を白、説明を淡い青にする。逆にすると階層が反転して読みにくい。
        d.text((x, 532), value, font=font(38), fill=WHITE, anchor="lm")
        d.text((x, 575), caption, font=font(20), fill=ACCENT_LIGHT, anchor="lm")
        x += 258

    # 右下に屋号
    d.text((W - L, 575), "ゼロイチIT", font=font(34), fill=WHITE, anchor="rm")

    return img


def make_icon():
    """512x512。ファビコンとApple touch icon。

    小さく表示されるので「ゼロイチ」だけ。IT まで入れると潰れる。
    """
    S = 512
    img = diagonal_gradient((S, S), DEEP_FROM, DEEP_TO)
    d = ImageDraw.Draw(img)

    f = font(int(S * 0.23))
    d.text((S / 2, S * 0.44), "ゼロイチ", font=f, fill=WHITE, anchor="mm")

    w = d.textlength("ゼロイチ", font=f)
    stroke = int(S * 0.022)
    d.line([(S / 2 - w / 2, S * 0.60), (S / 2 + w / 2, S * 0.60)],
           fill=ACCENT_LIGHT, width=stroke)

    # IT は線で描く。IPAゴシックの I はセリフ付きで「工」に見えるため。
    h = S * 0.15
    top, bottom = S * 0.74 - h / 2, S * 0.74 + h / 2
    t_w = h * 0.74
    gap = h * 0.30
    total = stroke + gap + t_w
    x = S / 2 - total / 2
    d.line([(x + stroke / 2, top), (x + stroke / 2, bottom)], fill=WHITE,
           width=stroke)
    tx = x + stroke + gap + t_w / 2
    d.line([(tx - t_w / 2, top + stroke / 2), (tx + t_w / 2, top + stroke / 2)],
           fill=WHITE, width=stroke)
    d.line([(tx, top), (tx, bottom)], fill=WHITE, width=stroke)

    return img


if __name__ == "__main__":
    for name, im in {"ogp": make_ogp(), "icon": make_icon()}.items():
        im.save(f"{PUB}/{name}.png")
        print(name, im.size, os.path.getsize(f"{PUB}/{name}.png") // 1024, "KB")
