const config = require("config");
const Uuid = require("uuid");
const fs = require("fs");

function blogUpdateTransferFiles(
  avatarFile,
  bannerFile,
  avatarStatusName,
  bannerStatusName
) {
  let avatarName;
  let bannerName;

  if (avatarFile && avatarStatusName !== "") {
    avatarName = Uuid.v4() + ".jpg";
    avatarFile.mv(config.get("staticBlogsAvatars") + "\\" + avatarName);
    fs.unlinkSync(config.get("staticBlogsAvatars") + "/" + avatarStatusName);
  } else if (avatarFile && avatarStatusName === "") {
    avatarName = Uuid.v4() + ".jpg";
    avatarFile.mv(config.get("staticBlogsAvatars") + "\\" + avatarName);
  }

  if (bannerFile && bannerStatusName !== "") {
    bannerName = Uuid.v4() + ".jpg";
    bannerFile.mv(config.get("staticBlogsBanners") + "\\" + bannerName);
    fs.unlinkSync(config.get("staticBlogsBanners") + "/" + bannerStatusName);
  } else if (bannerFile && bannerStatusName === "") {
    bannerName = Uuid.v4() + ".jpg";
    bannerFile.mv(config.get("staticBlogsBanners") + "\\" + bannerName);
  }

  return { avatarName, bannerName };
}

module.exports = blogUpdateTransferFiles;
