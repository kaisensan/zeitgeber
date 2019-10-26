let context = null;

// IMAGES UPLOAD
const imageUploadForm = document.getElementById('image_upload');

imageUploadForm.addEventListener('submit', evt => {
  evt.preventDefault();
});

// HERO
const heroForm = document.getElementById('hero');
const heroImage = heroForm.querySelector('.admin__item .link img');

heroForm.addEventListener('submit', evt => {
  evt.preventDefault();
});

heroImage.addEventListener('click', evt => {
  imagesPopup.style.display = 'flex';
  document.body.classList.add('lock');
  imagesPopupItems.forEach(item => {
    if (heroImage.getAttribute('src') === item.getAttribute('src')) {
      item.classList.add('image__button--selected');
    } else {
      item.classList.remove('image__button--selected');
    }
  });
  context = heroImage;
});

// CLOUD
const cloudForm = document.getElementById('cloud');
const cloudImage = cloudForm.querySelector('.admin__item .link img');

cloudForm.addEventListener('submit', evt => {
  evt.preventDefault();
});

cloudImage.addEventListener('click', evt => {
  imagesPopup.style.display = 'flex';
  document.body.classList.add('lock');
  imagesPopupItems.forEach(item => {
    if (cloudImage.getAttribute('src') === item.getAttribute('src')) {
      item.classList.add('image__button--selected');
    } else {
      item.classList.remove('image__button--selected');
    }
  });
  context = cloudImage;
});

// KNOW MORE
const knowMoreWrapper = document.getElementById('know_more_wrapper');
const knowMoreForms = knowMoreWrapper.querySelectorAll('.admin__item form');
const knowMoreImages = knowMoreWrapper.querySelectorAll('.admin__item form .link img');

knowMoreForms.forEach(form => {
  form.addEventListener('submit', evt => {
    evt.preventDefault();
  });
});

knowMoreImages.forEach(image => {
  image.addEventListener('click', evt => {
    imagesPopup.style.display = 'flex';
    document.body.classList.add('lock');
    imagesPopupItems.forEach(item => {
      if (image.getAttribute('src') === item.getAttribute('src')) {
        item.classList.add('image__button--selected');
      } else {
        item.classList.remove('image__button--selected');
      }
    });
    context = image;
  });
});

// IMAGES POPUP
const imagesPopup = document.getElementById('images_popup');
const imagesPopupCancel = imagesPopup.querySelector('.images .images__cancel');
const imagesPopupItems = imagesPopup.querySelectorAll('.images .link img');

imagesPopupCancel.addEventListener('click', evt => {
  imagesPopup.style.display = 'none';
  document.body.classList.remove('lock');
});

imagesPopupItems.forEach(item => {
  item.addEventListener('click', evt => {
    imagesPopupItems.forEach(item => item.classList.remove('image__button--selected'));
    item.classList.add('image__button--selected');

    if (context === knowMoreAdd) {
      insertImageTemplateAt(knowMoreWrapper, knowMoreAdd.parentElement, item.getAttribute('src'));
    } else {
      context.setAttribute('src', item.getAttribute('src'));
    }

    imagesPopup.style.display = 'none';
    document.body.classList.remove('lock');
  });
});

const knowMoreAdd = document.getElementById('know_more_add');

knowMoreAdd.addEventListener('click', evt => {
  imagesPopup.style.display = 'flex';
  document.body.classList.add('lock');
  imagesPopupItems.forEach(item => item.classList.remove('image__button--selected'));
  context = knowMoreAdd;
});

document.addEventListener('keydown', evt => {
  if (evt.keyCode === 9) {
    evt.preventDefault();
  }
});

const insertImageTemplateAt = (target, beforeElement, withSrc) => {
  const templ = document.querySelector('template');
  const clone = templ.content.cloneNode(true);
  const image = clone.querySelector('.admin__item form .link img');
  image.setAttribute('src', withSrc);
  target.insertBefore(clone, beforeElement);
}

const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === document.ELEMENT_NODE) {
        const image = node.querySelector('.admin__item .link img');

        image.addEventListener('click', evt => {
          imagesPopup.style.display = 'flex';
          document.body.classList.add('lock');
          imagesPopupItems.forEach(item => {
            if (image.getAttribute('src') === item.getAttribute('src')) {
              item.classList.add('image__button--selected');
            } else {
              item.classList.remove('image__button--selected');
            }
          });

          context = image;
        });
      }
    });
  });
});

observer.observe(knowMoreWrapper, { childList: true });
