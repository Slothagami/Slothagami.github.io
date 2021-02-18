function phrase(japaneese, english) {
    this.japaneese = japaneese
    this.english = english

    this.verify = function(str, j2e) { // j2e -> Japaneese to english
        match = j2e? this.english: this.japaneese 

        for(var i = 0; i < match.length; i++) {
            if(str.toLowerCase() == match[i]) return true
        }
        return false
    }
}

const vocab = [
    new phrase(
        ['くま'], 
        ['bear']
    ),
    new phrase(
        ['こきゅう'], 
        ['breathing']
    ),
    new phrase(
        ['とり'], 
        ['bird']
    ),
    new phrase(
        ['くろ'], 
        ['black']
    ),
    new phrase(
        ['あお'], 
        ['blue']
    ),
    new phrase(
        ['あか'], 
        ['red']
    ),
    new phrase(
        ['白', 'しろ'], 
        ['white']
    ),
    new phrase(
        ['がっこう'], 
        ['school']
    ),
    new phrase(
        ['水', 'みず'], 
        ['water']
    ),
    new phrase(
        ['犬', 'いぬ'], 
        ['dog']
    ),
    new phrase(
        ['猫', 'ねこ'], 
        ['cat']
    ),
    new phrase(
        ['はたらく'], 
        ['work']
    ),
    new phrase(
        ['まいにち'], 
        ['everyday', 'every day']
    ),
    new phrase(
        ['日本'], 
        ['japan']
    ),
    new phrase(
        ['日本語'], 
        ['japaneese']
    ),
    new phrase(
        ['あくま'], 
        ['demon', 'devil']
    ),
    new phrase(
        ['せかい'], 
        ['world']
    ),
    new phrase(
        ['あたま'], 
        ['head']
    ),
    new phrase(
        ['あたまがいい'], 
        ['smart', 'intelligent']
    ),
    new phrase(
        ['つよい'], 
        ['strong']
    ),
    new phrase(
        ['とにかく'], 
        ['anyway']
    ),
    new phrase(
        ['かわいい'], 
        ['cute']
    ),
    new phrase(
        ['こわい'], 
        ['scary']
    ),
    new phrase(
        ['一人', 'ひとり'], 
        ['alone', 'one person']
    ),
    new phrase(
        ['二人', 'ふたり'], 
        ['two people']
    ),
    new phrase(
        ['彼女', 'かのじょ'], 
        ['she', 'her', 'girlfriend', 'gf']
    ),
    new phrase(
        ['ともだち'], 
        ['friend']
    ),
    new phrase(
        ['ひめ'], 
        ['princess']
    ),
    new phrase(
        ['巨人', 'きょじん'], 
        ['giant']
    ),
    new phrase(
        ['おやすみ'], 
        ['goodnight', 'good night']
    ),
    new phrase(
        ['先生', 'せんせい'], 
        ['teacher']
    ),  
    new phrase(
        ['やさしい'], 
        ['kind', 'gentle']
    ),
    new phrase(
        ['人', 'ひと'], 
        ['person']
    ),
    new phrase(
        ['ただいま'], 
        ['im home', 'i\'m home']
    ),
    new phrase(
        ['本', 'ほん'], 
        ['book']
    ),
    new phrase(
        ['二人とも', 'ふたりとも'], 
        ['you two']
    ),
    new phrase(
        ['わかりました'], 
        ['i understand']
    ),
    new phrase(
        ['わかりません'], 
        ['i dont understand']
    ),
    new phrase(
        ['人間', 'にんげん'], 
        ['human']
    ),
    new phrase(
        ['鬼', 'おに'], 
        ['demon' ,'ogre', 'troll']
    ),
    new phrase(
        ['素晴らしい', 'すばらしい'], 
        ['wonderfull', 'magnificient', 'great']
    ),
    new phrase(
        ['耳', 'みみ'], 
        ['ear']
    ),
    new phrase(
        ['魔法', 'まほう', 'マジック'], 
        ['magic']
    ),
    new phrase(
        ['火', 'ひ', 'ファイア'], 
        ['fire']
    ),
    new phrase(
        ['ひらがな'], 
        ['hiragana']
    ),
    new phrase(
        ['カタカナ'], 
        ['katakana']
    ),
    new phrase(
        ['漢字'], 
        ['kanji']
    ),
    new phrase(
        ['オレンジ'],
        ['orange']
    ),
    new phrase(
        ['またね', 'まなねー', 'じゃーな', 'じゃーねえ', 'さよなら'],
        ['bye', 'goodbye', 'see you later']
    ),
    new phrase(
        ['ようこそ'],
        ['welcome']
    ),
    new phrase(
        ['ちさい'],
        ['small']
    ),
    new phrase(
        ['肉', 'にく'],
        ['meat']
    ),
    new phrase(
        ['かくしごと'],
        ['secret']
    ),
    new phrase(
        ['小さい', 'ちさい'],
        ['small']
    ),
    new phrase(
        ['めんどくさい'],
        ['troublesome', 'bothersome', 'a pain']
    ),
    new phrase(
        ['楽', 'たのしい'],
        ['fun']
    ),
    new phrase(
        ['助けて', 'たすけて'],
        ['help me']
    ),
    new phrase(
        ['うそつき'],
        ['liar']
    ),
    new phrase(
        ['みつけました', 'みつけた'],
        ['i found you', 'found you']
    ),
    new phrase(
        ['だいこん'],
        ['radish']
    ),
    new phrase(
        ['せいれい'],
        ['ghost', 'soul', 'spirit']
    ),
    new phrase(
        ['ことば'],
        ['word', 'words', 'phrase', 'language']
    ),
    new phrase(
        ['やくそく'],
        ['promise']
    ),
    new phrase(
        ['はずかしい'],
        ['embarrassed', 'ashamed', 'embarrassing']
    ),
    new phrase(
        ['絵本', 'えほん'],
        ['picture book']
    ),
    new phrase(
        ['魚', 'さかな'],
        ['fish']
    )
]