define(['vex', 'vex.dialog'], function(vex, vexDialog) {
  vex.defaultOptions.className = 'vex-theme-flat-attack';
  return {
    alert: function(message) {
      if ('ontouchstart' in window) {
        window.alert(message);
      } else {
        vexDialog.alert(message);
      }
    }
  };
});