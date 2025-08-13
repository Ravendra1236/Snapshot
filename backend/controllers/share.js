import { Content } from "../models/contentSchema.js";
import { Share } from "../models/shareModel.js";
import { User } from "../models/userSchema.js";
import { random } from "../utils.js";

export const shareLinkGenerator = async (req, res) => {
  const share = req.body.share;
  if (share) {
    const existingLink = await Share.findOne({
      userId: req.userId,
    });

    if (existingLink) {
      return res.json({
        hash: existingLink.hash,
      });
    }
    const hash = random(10);
    await Share.create({
      userId: req.userId,
      hash: hash,
    });
    return res.json({
      hash,
    });
  } else {
    await Share.deleteOne({
      userId: req.userId,
    });

    return res.json({
      mssg: "Link is removed!",
    });
  }
};

export const getContentShareLinkId = async (req, res) => {
  const hash = req.params.shareLink;

  const data = await Share.findOne({
    hash
  });
  

  if (!data) {
    return res.status(411).json({
      mssg: "Sorry incorrect Link",
    });
  }

  const content = await Content.find({
    userId: data.userId,
    
  });
  
  
  
  const user = await User.findOne({
    _id: data.userId,
  });

  
  if (!user) {
    return res.status(411).json({
      mssg: "User Not found, error should ideally not happen",
    });
  }

  res.json({
    name: user.name,
    content: content,
  });
};
