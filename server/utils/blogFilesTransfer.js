const config = require("config");
const Uuid = require("uuid");

function blogTransferFiles(avatarFile, bannerFile) {
  let avatarName;
  let bannerName;

  if (avatarFile) {
    avatarName = Uuid.v4() + ".jpg";
    avatarFile.mv(config.get("staticBlogsAvatars") + "\\" + avatarName);
  } else {
    avatarName = "";
  }

  if (bannerFile) {
    bannerName = Uuid.v4() + ".jpg";
    bannerFile.mv(config.get("staticBlogsBanners") + "\\" + bannerName);
  } else {
    bannerName = "";
  }

  return { avatarName, bannerName };
}

module.exports = blogTransferFiles;
