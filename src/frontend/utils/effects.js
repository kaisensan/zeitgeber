(() => {

  zeitgeber.isBelowTriggerZone = false;

  zeitgeber.switchThemes = (
    trigger,
    header,
    headerLogo,
    lightLogo,
    darkLogo,
    themeClass,
    threshold
  ) => {
    window.addEventListener( 'scroll', evt => {
      const positionFromTop = trigger.getBoundingClientRect().top;

      // The code below switches the current theme only when the trigger zone
      // is passed, this way the theme changes are applied once every trigger
      if ( zeitgeber.isBelowTriggerZone ) {
        if ( positionFromTop >= threshold ) {
          header.classList.remove( themeClass );
          headerLogo.attributes.src.value = lightLogo;
          zeitgeber.isBelowTriggerZone = false;
        }
      } else {
        if ( positionFromTop < threshold ) {
          header.classList.add( themeClass );
          headerLogo.attributes.src.value = darkLogo;
          zeitgeber.isBelowTriggerZone = true;
        } 
      }
    });
  }

  zeitgeber.fadeIn = ( elementsToApply, fadeInClass ) => {
    elementsToApply.forEach( e => e.classList.add( fadeInClass ) );

    window.addEventListener( 'scroll', evt => {
      elementsToApply.forEach( e => {
        const positionFromTop = e.getBoundingClientRect().top;

        if ( positionFromTop < 800 ) {
          e.classList.remove( fadeInClass );
        }
      });
    });
  };

})();
