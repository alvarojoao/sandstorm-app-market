Slingshot.GoogleCloud.directiveDefault.GoogleSecretKey = Assets.getText('SandstormAppStore.pem');

Slingshot.createDirective("imageUploader", Slingshot.GoogleCloud, {
  bucket: Meteor.settings.public.imageBucket,
  GoogleAccessId: Meteor.settings.GCSAccessId,
  acl: "public-read",

  authorize: function () {
    //Deny uploads if user is not logged in.
    if (!this.userId) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function (file) {
    return 'images/' + this.userId + '_' + new Date().valueOf() + '_' + file.name;
  }
});
