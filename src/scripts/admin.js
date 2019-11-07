(() => {

  let $context = null;

  // IMAGE UPLOAD
  const $imageUploadForm = document.getElementById('image_upload');

  $imageUploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const inputsPayload = zeitgeber.formatElementsPayload(evt.target, 'input', 'files');
    const $formData = new FormData();

    $formData.append('image', inputsPayload.image[0]);

    try {
      await zeitgeber.sendHttpRequest('POST', '/admin/upload/image', $formData);

      // TODO: Avisar ao usuário que as mudanças foram feitas com sucesso
    } catch (err) {
      // TODO: Avisar ao usuário que as mudanças falharam
      console.error(err, err.data);
    } finally {
      $imageUploadForm.querySelector('.admin__item input[type="file"]').value = '';
    }
  });

  // HERO
  const $heroForm = document.getElementById('hero');
  const $heroImage = $heroForm.querySelector('.admin__item .link img');

  $heroForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const inputsPayload = zeitgeber.formatElementsPayload(evt.target, 'input', 'value');
    const imgsPayload = zeitgeber.formatElementsPayload(evt.target, 'img', 'src');

    try {
      await zeitgeber.sendHttpRequest('PUT', '/admin', {
        hero: {
          ...inputsPayload,
          ...imgsPayload
        }
      });

      // TODO: Avisar ao usuário que as mudanças foram feitas com sucesso
    } catch (err) {
      // TODO: Avisar ao usuário que as mudanças falharam
      console.error(err, err.data);
    }
  });

  $heroImage.addEventListener('click', evt => {
    $imagesPopup.style.display = 'flex';
    document.body.classList.add('lock');
    $imagesPopupItems.forEach($item => {
      if ($heroImage.getAttribute('src') === $item.getAttribute('src')) {
        $item.classList.add('image__button--selected');
      } else {
        $item.classList.remove('image__button--selected');
      }
    });
    $context = $heroImage;
  });

  // CLOUD
  const $cloudForm = document.getElementById('cloud');
  const $cloudImage = $cloudForm.querySelector('.admin__item .link img');

  $cloudForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const inputsPayload = zeitgeber.formatElementsPayload(evt.target, 'input', 'value');
    const textareasPayload = zeitgeber.formatElementsPayload(evt.target, 'textarea', 'value');
    const imgsPayload = zeitgeber.formatElementsPayload(evt.target, 'img', 'src');

    try {
      await zeitgeber.sendHttpRequest('PUT  ', '/admin', {
        cloud: {
          ...inputsPayload,
          ...textareasPayload,
          ...imgsPayload
        }
      });

      // TODO: Avisar ao usuário que as mudanças foram feitas com sucesso
    } catch (err) {
      // TODO: Avisar ao usuário que as mudanças falharam
      console.error(err, err.data);
    }
  });

  $cloudImage.addEventListener('click', evt => {
    $imagesPopup.style.display = 'flex';
    document.body.classList.add('lock');
    $imagesPopupItems.forEach(item => {
      if ($cloudImage.getAttribute('src') === item.getAttribute('src')) {
        item.classList.add('image__button--selected');
      } else {
        item.classList.remove('image__button--selected');
      }
    });
    $context = $cloudImage;
  });

  // KNOW MORE
  const $projectInfo = document.getElementById('project_info');
  const $projectInfoForms = $projectInfo.querySelectorAll('.admin__item form');
  const $projectInfoImages = $projectInfo.querySelectorAll('.admin__item form .link img');
  const $projectInfoAdd = document.getElementById('project_info_add');

  $projectInfoForms.forEach(form => {
    form.addEventListener('submit', async (evt) => {
      evt.preventDefault();

      const textareasPayload = zeitgeber.formatElementsPayload(evt.target, 'textarea', 'value');
      const imgsPayload = zeitgeber.formatElementsPayload(evt.target, 'img', 'src');

      try {
        await zeitgeber.sendHttpRequest('PUT', '/admin', {
          projectInfo: {
            id: evt.target.id,
            ...textareasPayload,
            ...imgsPayload
          }
        });

        // TODO: Avisar ao usuário que as mudanças foram feitas com sucesso
      } catch (err) {
        // TODO: Avisar ao usuário que as mudanças falharam
        console.error(err, err.data);
      }
    });
  });

  $projectInfoImages.forEach(image => {
    image.addEventListener('click', evt => {
      $imagesPopup.style.display = 'flex';
      document.body.classList.add('lock');
      $imagesPopupItems.forEach(item => {
        if (image.getAttribute('src') === item.getAttribute('src')) {
          item.classList.add('image__button--selected');
        } else {
          item.classList.remove('image__button--selected');
        }
      });
      $context = image;
    });
  });

  $projectInfoAdd.addEventListener('click', evt => {
    $imagesPopup.style.display = 'flex';
    document.body.classList.add('lock');
    $imagesPopupItems.forEach(item => item.classList.remove('image__button--selected'));
    $context = $projectInfoAdd;
  });

  // IMAGES POPUP
  const $imagesPopup = document.getElementById('images_popup');
  const $imagesPopupCancel = $imagesPopup.querySelector('.images .images__cancel');
  const $imagesPopupItems = $imagesPopup.querySelectorAll('.images .link img');

  $imagesPopupCancel.addEventListener('click', evt => {
    $imagesPopup.style.display = 'none';
    document.body.classList.remove('lock');
  });

  $imagesPopupItems.forEach($item => {
    $item.addEventListener('click', evt => {
      $imagesPopupItems.forEach($item => $item.classList.remove('image__button--selected'));
      $item.classList.add('image__button--selected');

      if ($context === $projectInfoAdd) {
        insertImageTemplate($projectInfo, $projectInfoAdd.parentElement, $item.getAttribute('src'));
      } else {
        $context.setAttribute('src', $item.getAttribute('src'));
      }

      $imagesPopup.style.display = 'none';
      document.body.classList.remove('lock');
    });
  });

  const insertImageTemplate = ($atTarget, $beforeElement, withSrc) => {
    const $template = document.querySelector('template');
    const $clone = $template.content.cloneNode(true);
    const $image = $clone.querySelector('.admin__item form .link img');
    $image.setAttribute('src', withSrc);
    $atTarget.insertBefore($clone, $beforeElement);
  }

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === document.ELEMENT_NODE) {
          const $image = node.querySelector('.admin__item .link img');

          $image.addEventListener('click', evt => {
            $imagesPopup.style.display = 'flex';
            document.body.classList.add('lock');
            $imagesPopupItems.forEach(item => {
              if ($image.getAttribute('src') === item.getAttribute('src')) {
                item.classList.add('image__button--selected');
              } else {
                item.classList.remove('image__button--selected');
              }
            });

            $context = $image;
          });

          const $form = node.querySelector('.admin__item form');

          $form.addEventListener('submit', async (evt) => {
            evt.preventDefault();

            const textareasPayload = zeitgeber.formatElementsPayload(evt.target, 'textarea', 'value');
            const imgsPayload = zeitgeber.formatElementsPayload(evt.target, 'img', 'src');

            try {
              const { data } = await zeitgeber.sendHttpRequest('POST', '/admin', {
                projectInfo: {
                  ...textareasPayload,
                  ...imgsPayload
                }
              });

                $form.setAttribute('id', data.id);
              // TODO: Avisar ao usuário que as mudanças foram feitas com sucesso
            } catch (err) {
              // TODO: Avisar ao usuário que as mudanças falharam
              console.error(err, err.data);
            }
          });
        }
      });
    });
  });

  observer.observe($projectInfo, { childList: true });

  document.addEventListener('keydown', evt => {
    if (evt.keyCode === 9) {
      evt.preventDefault();
    }
  });

})();