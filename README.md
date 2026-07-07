# 🕵️‍♂️ Keskin Developer

### [TR] - TÜRKÇE AÇIKLAMA

Bu yazılım, hedef sunucudaki üyeleri Discord Gateway protokollerinin izin verdiği ölçüde tarayarak **Discord Staff, Early Supporter, Partner** gibi değerli rozetleri anında tespit eder ve Webhook kanalınıza raporlar.

**Önemli Bilgilendirme (Member Fetch):** Discord'un Gateway sınırlamaları nedeniyle, 10k üzerindeki büyük sunucularda (örneğin 100k memberlı) her zaman tüm üyeleri çekemeyebilir. Bu durumlarda sadece aktif üyeleri veya Gateway'in izin verdiği ortalama 2-7k arası kullanıcıyı tarayabilir. 10k altındaki sunucularda ise eksiksiz tarama yapar.

⚠️ **KRİTİK UYARI:** Bu proje kendi **node_modules** bütünlüğü ile çalışmaktadır. Lütfen projeyi indirdikten sonra `npm install` komutunu çalıştırmayınız; dosya içinde halihazırda bulunan `node_modules` klasörünü kullanınız. Aksi takdirde modifiye edilmiş kütüphaneler bozulacak ve yazılım hata verecektir.

#### 🛠️ Kurulum ve Ayarlar
`badgeScraper.js` dosyasını açın ve `CONFIG` bölümünü doldurun:
1. **TOKEN:** Tarama yapacak hesabın tokeni. (Hesap sunucuda bulunmalıdır!)
2. **TARGET_GUILD_ID:** Üyeleri taranacak sunucunun ID'si.
3. **WEBHOOK_URL:** Sonuçların gönderileceği Webhook adresi.
* **Not:** Gireceğiniz token, hedef sunucuda bulunmak zorundadır. Aksi takdirde **"Guild not found!"** hatası alırsınız.

#### 🚀 Çalıştırma
1. Sistemde Node.js kurulu olduğundan emin olun.
2. Ayarları yaptıktan sonra şu komutu yazın:
   ```node badgeScraper.js```
3. İşlemi durdurmak için `Ctrl+C` yapabilirsiniz; tarama bitince yazılım otomatik olarak kapanır.

#### 🧐 Teknik Özellikler
* **Üye Çekimi:** `member.fetch` ile API üzerinden en güncel listeyi çeker.
* **Akıllı Filtreleme:** Sadece "Değerli" (Staff, Dev, Early vb.) hesapları ayıklar.
* **Profil Analizi:** Filtreye takılan hesapların profillerine tek tek girerek gizli detayları yakalar.

### Ornek Cikti & Webhook 
![Terminal Output](https://media.discordapp.net/attachments/1216907400188137584/1476625599199187126/image.png?ex=69a27701&is=69a12581&hm=01b52f9a69fbb37bbcedec8cebe7539bad77b462903e0a989463e999d05f30d6&=&format=webp&quality=lossless) ![Webhook embed](https://media.discordapp.net/attachments/1216907400188137584/1476555601722216478/image.png?ex=69a2de90&is=69a18d10&hm=7bc134960c786043850141092f99822e086a21c03355c5bbb104470b06ad67ba&=&format=webp&quality=lossless)

**For Help:** twixyfush

---

### [EN] - ENGLISH DESCRIPTION

This software scans members of a target server using Discord Gateway protocols to identify high-value accounts (e.g., **Discord Staff, Early Supporter, Partner**) and reports them instantly via Webhook.

**Member Fetch Notice:** Due to Discord's Gateway limitations, it may not be possible to fetch all members in large servers (e.g., 100k+ members). In such cases, it will scan active users or an average of 2-7k members allowed by the gateway. Servers with fewer than 10k members can be scanned completely.

⚠️ **CRITICAL WARNING:** This project works with its own **node_modules** integrity. Do not run `npm install` after downloading. Use the `node_modules` folder provided within the project; otherwise, the modified libraries will be overwritten, and the code will fail.

#### 🛠️ Setup and Configuration
Open `badgeScraper.js` and fill in the `CONFIG` section:
1. **TOKEN:** The token of the account performing the scan. (Account must be in the server!)
2. **TARGET_GUILD_ID:** The ID of the server to be scanned.
3. **WEBHOOK_URL:** Your Discord Webhook URL.
* **Note:** The token used must be a member of the target guild. Otherwise, you will receive a **"Guild not found!"** error.

#### 🚀 Execution
1. Ensure Node.js is installed on your system.
2. Run the following command:
   ```node badgeScraper.js```
3. Press `Ctrl+C` to stop; the process exits automatically when the scan is finished.

#### 🧐 Features
* **Member Fetching:** Pulls real-time data from the API via `member.fetch`.
* **Smart Filtering:** Extracts only "High-Value" accounts (Staff, Dev, Early, etc.).
* **Profile Deep-Dive:** Accesses profile data for filtered accounts to catch hidden details.

---

### Example Output & Embed
![Terminal Output](https://media.discordapp.net/attachments/1216907400188137584/1476625599199187126/image.png?ex=69a27701&is=69a12581&hm=01b52f9a69fbb37bbcedec8cebe7539bad77b462903e0a989463e999d05f30d6&=&format=webp&quality=lossless) ![Webhook embed](https://media.discordapp.net/attachments/1216907400188137584/1476555601722216478/image.png?ex=69a2de90&is=69a18d10&hm=7bc134960c786043850141092f99822e086a21c03355c5bbb104470b06ad67ba&=&format=webp&quality=lossless)

**For Help:** twixyfush
