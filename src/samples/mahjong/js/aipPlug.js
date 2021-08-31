var aiptag = aiptag || {};
aiptag.cmd = aiptag.cmd || [];
aiptag.cmd.display = aiptag.cmd.display || [];
aiptag.cmd.player = aiptag.cmd.player || [];

aiptag.gdprShowConsentTool = true;
aiptag.gdprShowConsentToolButton = true;


window.aipPlug = {
  play: function (cb) {
    cb && cb();
  }
};
