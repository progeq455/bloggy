const config = require("config");
const Uuid = require("uuid");
const fs = require("fs");

function articleUpdateBannerTranfer(bannerFile, bannerStatusName) {
  let bannerName;

  if (bannerFile && bannerStatusName !== "") {
    bannerName = Uuid.v4() + ".jpg";
    bannerFile.mv(config.get("staticArticlesBanners") + "\\" + bannerName);
    fs.unlinkSync(config.get("staticArticlesBanners") + "/" + bannerStatusName);
  } else if (bannerFile && bannerStatusName === "") {
    bannerName = Uuid.v4() + ".jpg";
    bannerFile.mv(config.get("staticArticlesBanners") + "\\" + bannerName);
  }

  return bannerName;
}

module.exports = articleUpdateBannerTranfer;
