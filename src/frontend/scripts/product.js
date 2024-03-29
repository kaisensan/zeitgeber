(() => {

  const trigger = document.getElementById('description');
  const header = document.querySelector('.header');
  const headerLogo = document.querySelector('.header .logo__content');

  zeitgeber.switchThemes(
    trigger,
    header,
    headerLogo,
    '/img/t4p-dark.svg',
    '/img/t4p-light.svg',
    'header--light',
    225
  );

  // Change currently selected image
  const allImages = Array.from(document.getElementsByClassName('slider__unselected'));
  const selectedImage = document.querySelector('.slider__display');

  let isSliding = 0;

  const changeImage = (imageList, imageDisplay, imageIcon) => {
    if (isSliding <= 2) {
      imageList.forEach(e => e.classList.remove('slider__selected'));
      imageIcon.classList.add('slider__selected');
      imageDisplay.src = imageIcon.src;
    }
  }

  allImages.forEach(e => e.addEventListener('click', evt => {
    changeImage(allImages, selectedImage, e);
  }));

  // Zoom when clicking selected image
  const zoomImage = document.querySelector('.slider__zoom');
  const zoomElement = document.querySelector('.purchase__zoom');

  const toggleOverlay = (overlayContainer) => {
    overlayContainer.classList.toggle('purchase__overlay');
    document.body.classList.toggle('lock');
  }

  selectedImage.addEventListener('click', evt => {
    toggleOverlay(zoomElement);
    zoomImage.src = selectedImage.src;
  });

  zoomElement.addEventListener('click', evt => {
    toggleOverlay(zoomElement);
  });

  // Open up overlay to continue purchase (sending email)
  const btnCheckOut = document.getElementById('options_send');
  const buyElement = document.querySelector('.purchase__buy');
  const btnOverlayCancel = document.querySelector('.order__cancel');
  const options = document.querySelectorAll('.options__form .options__option');
  const summaryOptions = document.querySelector('.order__summary .bullets');

  btnCheckOut.addEventListener('click', evt => {
    const checkedOptions = Array.from(options)
                                .filter(option => option.querySelector('.options__input').checked);

    if (checkedOptions.length === 0) {
      return;
    }

    summaryOptions.innerText = '';

    checkedOptions.forEach(option => {
      const opt = document.createElement('li');

      opt.classList.add('bullets__item');
      opt.innerText = option.innerText.split('\n')[0];
      summaryOptions.append(opt);
    });

    toggleOverlay(buyElement);
  });

  btnOverlayCancel.addEventListener('click', evt => {
    toggleOverlay(buyElement);
  });

  // Dragging the image slider
  const imagesElement = document.querySelector('.slider__list');
  const imageSlider = document.querySelector('.slider');
  let isDown = false;
  let offsetX = 0;
  let currentPosition = 0;
  let initialPosition = allImages[0].getBoundingClientRect().left;

  const slideStart = (evt) => {
    isDown = true;
    // determines an offset comparing current position and where the user clicked
    offsetX = evt.clientX - currentPosition;
  }

  // this requires a bit clearer code
  const slideEnd = () => {
    isDown = false;
    let imageWidth = allImages[0].offsetWidth;
    // current X position of first image
    let currFirstPos = allImages[0].getBoundingClientRect().left;
    // which image to snap to
    let snapPosition = (currFirstPos > initialPosition) ?
      0 : Math.floor((currFirstPos - initialPosition) / imageWidth);
    // set current position to where it'll snap to
    if (allImages.length < 5) {
      currentPosition = 0;
    }
    else if (-snapPosition > allImages.length - 5) {
      currentPosition = -(allImages.length - 5) * imageWidth;
    }
    else {
      currentPosition = snapPosition * imageWidth;
    }
    imageSlider.style.transform = 'translateX(' + currentPosition + 'px)';
    setTimeout(() => { isSliding = 0; }, 100);
  }

  const slideMove = evt => {
    if (isDown) {
      isSliding++;
      imageSlider.style.transform = 'translateX(' + (evt.clientX - offsetX) + 'px)';
      currentPosition = evt.clientX - offsetX;
    }
  }

  imagesElement.addEventListener('mousedown', evt => {
    slideStart(evt);
  });

  document.body.addEventListener('mouseup', evt => {
    if (isDown && isSliding) slideEnd();
    else isDown = false;
  });

  document.body.addEventListener('mousemove', evt => {
    slideMove(evt);
  });

  imagesElement.addEventListener('touchstart', evt => {
    let style = imageSlider.getAttribute('style');
    imageSlider.setAttribute('style', style + 'transition: transform 0s ease-in-out;');
    slideStart(evt.touches[0]);
  });

  document.body.addEventListener('touchend', evt => {
    if (isDown && isSliding) {
      let style = imageSlider.getAttribute('style');
      imageSlider.setAttribute('style', style + 'transition: transform 0.2s ease-in-out;');
      slideEnd();
    }
    else isDown = false;
  });

  document.body.addEventListener('touchmove', evt => {
    slideMove(evt.touches[0]);
  });

  // handling the change of window sizes
  function on_resize(cb, t) {
    onresize = function () {
      clearTimeout(t);
      t = setTimeout(cb, 100);
    };

    return cb;
  };

  on_resize(function () {
    initialPosition = imagesElement.getBoundingClientRect().left + 3; // this +3 depends on the border CSS setting on purchase-image-list (3px)
    slideEnd(); // running slideEnd() makes it so the image list snaps to a proper position after window resizing
  })();

})();
