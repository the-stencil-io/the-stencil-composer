# Stencil CMS Alpha Käyttöohje

## Sisältö

* [Esittely](#Introduction)
* [Ominaisuudet](#Features)
  * [Artikkelit](#Articles)
  * [Sivut](#Pages)
  * [Linkit](#Links)
  * [Lomakkeet ja työnkulut](#Forms-and-workflows)
  * [Paikannukset](#Localisations)
  * [Julkaisut](#Releases)
* [Stencil-käyttöliittymän esittely](#Intro-to-UI-Layout)
* [Ensimmäisten resurssien luominen](#Creating-your-first-resources)
* [Resurssien poistaminen ja irrottaminen](#Deleting-and-removing-resources)



### Esittely

Stencil CMS on sisällönhallintajärjestelmä, joka on kehitetty luomaan ja hallinnoimaan staattista sisältöä usealla kielellä käyttäen [Markdown]-järjestelmää (https://www.markdownguide.org/). 

Stencil koostuu kahdesta osasta: 

* **Stencil CMS**: Pääasiallinen sovellus staattisen sisällön hallintaan, suunniteltu toimimaan yhdessä organisaatiosi Stencil Portal -käyttöliittymän kanssa.
* **Stencil Portal Käyttöliittymä**: Staattisen sisällön sivusto, jossa käyttäjät pystyvät lukemaan sisältöäsi, täyttämään lomakkeita, vastaanottamaan viestejä organisaatioltasi ja muuta. 

Tämä alusta vakauttaa ja yhdistää sisältösi, datankeruun ja prosessien automatisoinnin yhteen tilaan. 

Keskeiset filosofiat:

**Monikielisen sisällön tuottamisen tulisi olla tehokasta ja yksinkertaista.**  

Nykypäivänä monikielisen sisällön tuottaminen ja hallinta on olennaista. Kaiken Stencilissä on tarkoitus virtaviivaistaa sisällön tuottamisen ja kääntämisen prosesseja. Esimerkiksi Stencilin avulla kääntäjät voivat nähdä alkuperäisekielisen tekstin kirjoittaessaan käännettyä teksiä halkaistun näytön avulla. Aikaa säästyy ja työ helpottuu, kun ei ole tarpeen vaihdella näkymää ikkunasta toiseen. 

**Sisällön tuottajien ei tulisi tarvita hallita sisältöään useissa eri paikoissa samaan aikaan.**  

Stencilin avulla voit asettaa käännökset, linkit, kielet ja työnkulut kerran ja käyttää näitä resursseja ja niiden käännöksiä laajasti tai yksittäisesti. Jos linkin tekstiä tarvitsee muuttaa, se tehdään **yhdessä** paikassa ja muutokset päivittyvät kaikkialle missä linkkiä käytetään. Tai esimerkiksi on lomake, joka on useassa paikassa sovelluksessasi. Riittää, että lomaketta muokataan kerran, jotta se päivittyy kaikkialle missä se on käytössä. Näin vapautuu enemmän aikaa uuden sisällön tuottamiseen, kun ei tarvitse huolehtia siitä, miten monessa paikassa sisältöä pitää muokata.

**Datankeruu ja prosessien automatisointi ovat ensisijaisia elementtejä CMS ratkaisun kokonaisuudessa.**  

Sisällön tarjoaminen käyttäjille on mahtavaa. Parempaa vielä on kuitenkin tarjota käyttäjille mahdollisuus tehdä toimintoja sisällön kanssa sekä suunnitella prosesseja toimimaan tämän datan perusteella. Stencil toimii kahden muun alustan kanssa tarjotakseen lomake- ja prosessipalveluita. Uskomme, että organisaatioiden tulisi pystyä hallitsemaan kaikkia näitä kolmea elementtiä luodakseen täydellisesti tarpeisiinsa sopivan ratkaisun. 

**Versioiden hallinta on ehdottoman tärkeää.**  

Aikaa ja vaivaa säästyy, kun pidetään sekä yhtä todenmukaista lähdettä, että tarkistettua muutoshistoriaa. Tästä syystä Stencilin Release-ominaisuus mahdollistaa yksinkertaisten merkintöjen ja lisähuomioiden tekemisen, jolloin on mahdollista palata aikaisempaan työhön koska tahansa, tehdä vikatarkastuksia tai palauttaa työ aikaisempaan vaiheeseen.  

---

### Ominaisuudet

* Yksinkertainen, monikielinen sisältörakenne Markdown syntaksilla
* Samanaikainen, halkaistun näytön sisällönmuokkaus kahdelle kielelle (Tuplanäkymä)
* Yhdistä lomakkeet ja niiden työnkulut staattiseksi sisällöksi
* Versionnin ja julkaisun hallintajärjestelmä 
* Paikannettavuus kaikelle sisällölle, linkeille, lomakkeille ja työnkuluille 

---

## Käyttäjän perusopas

Stencil koostuu kuudesta eri elementistä, joihin viitataan "resursseina". Resursseja ovat: 

* **Artikkelit**: Sisällyttävät ryhmittymiseen liittyvät resurssit 
* **Sivut**: Paikannettua Markdown-sisältöä, suorassa yhteydessä artikkeleihin   
* **Linkit**: Paikannettuja sisäisiä tai ulkoisia linkkejä 
* **Paikannukset**: Saatavilla olevat kielet sisällölle 
* **Julkaisut**: Versiot / kuvat sisällön kokonaisuudesta annettuna aikana
* **Työnkulut**: Paikannetut lomakkeet ja prosessit yhteydessä artikkeleihin / sivuihin 


### Artikkelit

Artikkelit voidaan käsittää eräänlaisina lokeroina ryhmittymiseen liittyville elementeille/resursseille. Artikkeli on keskus, joka yhdistää sivut (paikannettu sisältö), linkit ja työnkulut. 

![Articles](readme-images/stencil-article-association.png)



Artikkelilla **täytyy** olla nimi (nimi muokattavissa) ja ainakin yksi sivu. Nimellä on vain käytännöllinen tarkoitus, eikä se näy käyttöpuolella lainkaan. Artikkelit, joissa ei ole sivuja eivät kirjaudu käyttöliittymälle.  

Artikkelin edessä **täytyy** olla kolminumeroinen luku. Numero määrittää sen, missä järjestyksessä se näkyy valikossa.  

Esimerkki artikkelin nimestä ja järjestysnumerosta: `100_Housing`

Artikkeliin **voi** olla yhdistetty linkkejä ja työnkulkuja, mutta se ei ole pakollista. 

Artikkeleita voodaan kerrostaa korkeintaan **kahdelle** tasolle. On mahdollista olla yksi emoartikkeli ja yksi tytärartikkeli. Alla esimerkki kerrostetusta artikkelista: 

`150_Construction/100_Building_Permits`

Artikkelien käyttöpuolella näkyvät nimet tulevat ensimmäisestä Markdown Level 1 otsikosta kullakin sivulla. 


Esimerkkitilanne: Sinulla on artikkeli, jolla on kaksi sivua: `en.md` ja `et.md`. Haluat tämän artikkelin näkyvän käyttäjille englanniksi nimellä "Animals", mutta haluat varmistaa, että viron kielen valinneelle käyttäjälle nimi näkyy vironkielisenä: "Loomad". Tehdäksesi näin yksinkertaisesti annat jokaiselle sivulle Level 1 otsikon oikealla nimellä, jolloin järjestelmä ottaa nimet käyttöön. 

en.md

```markdown

# Animals

```

et.md

```markdown

# Loomad

```


---

### Sivut  

Sivut ovat Markdown-tiedostoja. Ne ovat nimettyjä sisältönsä kielen mukaan ja sisältävät vain määrätyn kielistä sisältöä. Esimerkiksi sivulla `en.md` on vain englanninkielistä sisältöä. 

Perussääntö on 1 sivu == 1 sijainti. Artikkelissa voi olla miten paljon sivuja tahansa, riippuen esitettävien kielten määrästä. Kuitenkin on mahdollista olla vain YKSI sivu artikkelia kohti samassa sijainnissa. 

Koska sivu on suorassa yhteydessä sijaintiin sen olemassaolo on riippuvainen halutun sijainnin olemassaolosta. Jos siis halutaan luoda sivuja kielellä, jota ei olla vielä lisätty on ensin luotava sijainti, jotta voidaan luoda sivuja käyttämään tätä sijaintia. 

Sivulla **täytyy** olla ainakin 1 Markdown Level 1 otsikko. Ensimmäinen tällainen otsikko sivulla toimii paikannettuna nimenä arikkelille, jonka käyttäjä näkee sisältövalikossa. 

Sivulla ei ole muokattavaa nimeä. Sivun nimi on aina [kaksikirjaiminen kielitunniste](https://en.wikipedia.org/wiki/ISO_639-1), joka vastaa sivun sisällön kieltä ja jota seuraa `.md` tiedostotunniste. Esimerkiksi `sv.md` on ruotsinkielinen Markdown-sivu.  
A Page is specific to an Article, and it cannot exist outside of an Article. 

Tiivistettynä, ennen sivun luomista on muistettava kolme asiaa: I

* Artikkelin, jossa sivun halutaan olevan tulee olla olemassa jo etukäteen. 
* Sivun sisällön sijainnin tulee olla etukäteen olemassa.
* Sivulla tulee olla Markdown Level 1 otsikko, joka näyttäytyy sivun aiheena käyttäjille sisältövalikossa. 

---

### Linkit

Linkit voivat olla **sisäisiä**, **ulkoisia** tai **puhelinnumeroita**. Sisäinen linkki yhdistyy domainin sisäisille sivuille, kun taas ulkoiset linkit yhdistyvät domainin ulkopuolisille sivuille. "Puhelin" -tyyppiset linkit näyttäytyvät puhelinnumeroina käyttöliittymässä. 

Linkit voivat liittyä mihin tahansa, kaikkiin tai ei mihinkään artikkeleihin / sivuihin.

Linkit ovat paikannettuja. Sijainti, joka linkille määritetään sitä luotaessa määrittää linkit näkymään vain sivuilla, jotka ovat tässä sijainnissa. Alla esimerkkitilanne: 

On artikkeli `100_Housing`. Artikkelilla on kaksi sivua, `en.md` ja `sv.md`. Luodaan linkki, jonka sijainti on `en`. Linkki yhdistetään artikkeliin `100_Housing`. Linkki tulee näkymään vain sivulla `en.md`, vaikka se yhdistettiin koko artikkeliin. Jos linkin halutaan näkyvän myös sivulla `sv.md` sille tulee antaa tämän mukainen paikannus.

Jos halutaan linkin näkyvän KAIKILLA artikkelin sivuilla, kielestä huolimatta, jätetään sijaintikenttä tyhjäksi linkkiä luodessa. 

Kun linkki on luotu se on saatavilla koko sovelluksessa.
 
Jos jonkin linkin ei haluta näkyvän tietyllä sivulla enää, linkin yhteys Artikkeliin voidaan erottaa poistamatta linkkiä sovelluksesta.  

Kun linkki poistetaan, se poistuu sovelluksesta kokonaan. 

---

### Lomakkeet ja työnkulut

Stencil on suunniteltu kokoamaan sisältösi, datankeruusi ja prosessiesi automatisoinni yhteen vakaaseen sovellukseen. Käytännössä voit siis asettaa staattisen sisältösi ohjaamaan käyttäjät lomakkeittesi pariin ja luoda työnkulkuja määrittämään mitä tapahtuu, kun näihin lomakkeisiin on vastattu.  

Pidetään esimerkkinä tilannetta, jossa organisaatiosi haluaa tarjota käyttäjille lomakkeen, jolla tiedustellaan/kysellään jostain tuotteesta. Kun käyttäjä palauttaa täytetyn lomakkeen, hallinnoija/administraattori saa tästä ilmoituksen ja toimii sen mukaisella tavalla. Tämä reaktio voi olla myös automatisoitu ja on täysin mallinnettavissa tarpeidesi mukaan.  

---

### Paikannukset

Paikannukset (sijainnit) mahdollistavat siältösi kielen määrittämisen. Paikannuksia voidaan määrittää niin paljon kuin on tarpeen.  
  
Sijainnit luodaan määrittämällä kieli [kaksikirjaimisen kielitunnisteen](https://en.wikipedia.org/wiki/ISO_639-1) perusteella. Järjestelmä käyttää näitä kielitunnisteita myös nimeämään sivuja. Kun luodaan sijainti englanninkielelle (`en`) ja tähän sijaintiin lisätään sivuja, sivujen nimeksi tulee automaattisesti `en.md`. 

Kun sijainti on luotu, se on saatavilla koko sovelluksessa. Tällöin voidaan alkaa luomaan sisältöjä kunten sivuja, linkkejä jne. paikantamalla niitä tähän sijaintiin. 

Stencil tarjoaa myös "Locale Usage Overview" (Sijainninkäytön yhteenveto) -ominaisuuden, jonka avulla voidaan seurata helposti, millä artikkeleilla on tai ei ole sivuja kullekkin aktivoidulle kielelle. Myös artikkeli - sijainti käyttötaulukko on saatavilla, mikä näyttää koko sivuston yhteenvedon seuraavista asioista: 

* Kaikki sivusi artikkelit ja sijainnit 
* Artikkeli-sivu yhteenveto 
  * Artikkelit, joilla ei ole tietyn sijainnin sivuja 
  * Artikkelit, joilla on tietyn sijainnin sivuja, mutta ei sisältöä näillä sivuilla 
  * Artikkelit, joilla on tietyn sijainnin sivuja, joilla on sisältöä 

![Locale usage overview](readme-images/locale-usage-overview.png)

---

### Julkaisut

With versioning and releases, you can keep a history of your content throughout time.  When you make a release in The Stencil, you create a snapshot of your **entire** content state at that point in time. Then, you can apply that release, whether it is a test or a production release. 

If it turns out that your release isn't what you were expecting, you can easily revert back to a previous release. 

---


## Intro to UI Layout

![Stencil UI](readme-images/stencil-ui.png)  

### 1: Explorer

Use the Explorer to view Articles and their associated resources.

### 2: Toolbar

The Toolbar contains shortcut links to everyday functionalities:

* Dashboard
* Articles View
* Links View
* Workflows View
* Releases View
* Locales View

#### Dashboard

The Dashboard (home icon in the Toolbar) is the centralised location from which you can create and modify Resources.

### 3: Article Options menu

Expand an Article in the Toolbar and click the three dots icon to open the Article Options menu. From here, you can easily work with Article Resources.

### 4: Tab bar

View all currently open Resources and switch between them smoothly.

### 5: Content Editor

Edit your content here. In the screenshot above, Dual View is enabled, which allows you to edit two languages side by side. This is useful for translating from one language to the other. 

**NOTE**: Dual View is only available if TWO OR MORE Pages exist in an Article. To enable Dual View:

1. Select one page and open it in the Content Editor
2. Click the Dual View switch
3. Click the second page you wish to open in the Content Editor.
4. To close the second page, simply click the Dual View switch again to deactivate it.

---

## Creating your first resources


#### Create an Article

Select "Create an Article" in the Explorer. (Note, this button only appears the first time you add an Article).  OR

Nagivate to the Dashboard (home icon in the toolbar) and create a new Article.

In the dialog window, leave "Parent Article" empty, as you don't have any other Articles yet.

Set the Order Number of your Article. The Order number dictates where the Article will appear in your portal's Topic menu. 

The number must be 3 digits. The lower the number, the higher the Article will appear in the Topic menu. For example, an Article with Order: 100 will appear *before* an Article with Order: 300.

Once you hit "Create", your first Article will be created in the Explorer. However, you don't yet have any Locales, so you also don't have any Pages. Expand your Article by clicking the expand arrow icon. You will be prompted to create your first Locale.

#### Create a Locale

You will see a notification that says: "No Locales". Click here to add one, which will enable you to start creating content.

When creating your locale:

Use the two-letter language code of the locale you want to add: Examples:

`en` : English  
`fi` : Finnish  
`sv` : Swedish  

#### Create a Page for your Locale
 
Once you have created a locale, you need to create a Page for that locale. In the expanded view of your Article, click "Create page" to do this.  
NOTE: Once you have created two or more pages, you can enable "Dual View", which will allow for side-by-side content editing of two languages at the same time.

#### Add Links, Workflows, and additional Locales

Links, Workflows, and additional Locales are added globally. You can create these in whatever order you wish from the Dashboard.

#### Associate Links and Workflows with Articles and Pages

Once Links / Workflows have been created, you can "associate" them with existing Articles. To associate a link or a Workflow with an Article, open the Article Options menu and select "Add and remove Article links" or "Add and remove Article Workflows".

The locale you specify for a link will automatically create the connection between that link and the correct Page within that Article.

#### Make a release

* When your content is ready, make a new Release. Give it a name and an optional note, and you're ready for publishing. You can always download the JSON of your site at any time.

## Deleting and Deactivating resources

**Important Notes**:

**Deleting** is a global action. The deleted Resource will no longer be available.  
**Deactivating** is specific to one Resource or a Resource Association. The Resource will still be globally available if you want to use it again later, but it will be hidden from the end-user point of view.

* **Article**: Articles are deleted globally via the "Articles" menu option.  
* **Page**: Because Pages cannot exist outside of Articles, they are deleted from their article via the "Article Options" menu.

Note that when you delete an Article, you also delete **all pages** associated with that Article.

* **Link**: Links are deleted globally via "Links View". 
 
Link / Article associations are deactivated via the "Add and remove Article Links" menu option in Article Options.  

* **Workflow**: Workflows are deleted globally via "Workflows View".

Workflow / Article associations are deactivated via the "Add and remove Article Workflows" menu option in Article Options.


* **Locale**: Locales are deleted globally via the "Locales" menu option.

Locales can be set to "Active" or "Deactivated". If a locale is set to Deactivated, all Resources of that locale will be invisible on the end-user side.  This can be done via "Locales View".


* **Release**: Releases cannot be deleted or edited once they are created.

Previous Releases can be activated if you need to revert to a previous version. They can also be viewed. 



