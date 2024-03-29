(() => {

  let $context = null;

  // IMAGE UPLOAD
  const $imageUploadForm = document.getElementById('image_upload');

  $imageUploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const inputsPayload = zeitgeber.extractRequestPayload(evt.target, 'input', 'files');
    const $formData = new FormData();

    $formData.append('image', inputsPayload.image[0]);

    try {
      await zeitgeber.sendHttpRequest('POST', '/admin/upload/image', $formData);

      window.location.reload();
    } catch (err) {
      const alert = document.createElement('div');
      alert.innerText = 'Something went wrong!\n' + err;
      alert.setAttribute('class', 'alert alert--bad');

      document.body.append(alert);
      setTimeout(() => document.querySelector('.alert').remove(), 6000);
      console.error(err, err.data);
    }
  });

  // HERO
  const $heroForm = document.getElementById('hero');
  const $heroImage = $heroForm.querySelector('.admin__item .link img');

  $heroForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const inputsPayload = zeitgeber.extractRequestPayload(evt.target, 'input', 'value');
    const imgsPayload = zeitgeber.extractRequestPayload(evt.target, 'img', 'src');

    try {
      await zeitgeber.sendHttpRequest('PUT', '/admin?to=hero', {
        hero: {
          ...inputsPayload,
          ...imgsPayload
        }
      });

      const alert = document.createElement('div');
      alert.innerText = 'Successful change!';
      alert.setAttribute('class', 'alert');

      document.body.append(alert);
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    } catch (err) {
      const alert = document.createElement('div');
      alert.innerText = 'Something went wrong!\n' + err;
      alert.setAttribute('class', 'alert alert--bad');

      document.body.append(alert);
      setTimeout(() => document.querySelector('.alert').remove(), 6000);
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

  // PRODUCTS
  const $productsWrapper = document.getElementById('products');
  const $productItems = $productsWrapper.querySelectorAll('.admin__item');
  const $productDeleteButtons = $productsWrapper.querySelectorAll('.admin__item .link--danger');

  $productDeleteButtons.forEach((button, index) => {
    button.addEventListener('click', async (evt) => {
      evt.preventDefault();

      try {
        await zeitgeber.sendHttpRequest('DELETE', `/admin?from=product&id=${$productItems[index].id}`);
        $productItems[index].remove();

        const alert = document.createElement('div');
        alert.innerText = 'Successful change!';
        alert.setAttribute('class', 'alert');

        document.body.append(alert);
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
      } catch (err) {
        const alert = document.createElement('div');
        alert.innerText = 'Something went wrong!\n' + err;
        alert.setAttribute('class', 'alert alert--bad');

        document.body.append(alert);
        setTimeout(() => document.querySelector('.alert').remove(), 6000);
        console.error(err, err.data);
      }
    });
  });

  const $productAdd = document.getElementById('product_add');

  $productAdd.addEventListener('click', async (evt) => {
    evt.preventDefault();

    const { data } = await zeitgeber.sendHttpRequest('POST', '/admin?to=product');

    window.location.href = `/admin/product/${data.id}`;
  });

  // CLOUD
  const $cloudForm = document.getElementById('cloud');
  const $cloudImage = $cloudForm.querySelector('.admin__item .link img');

  $cloudForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const inputsPayload = zeitgeber.extractRequestPayload(evt.target, 'input', 'value');
    const textareasPayload = zeitgeber.extractRequestPayload(evt.target, 'textarea', 'value');
    const imgsPayload = zeitgeber.extractRequestPayload(evt.target, 'img', 'src');

    try {
      await zeitgeber.sendHttpRequest('PUT', '/admin?to=cloud', {
        cloud: {
          ...inputsPayload,
          ...textareasPayload,
          ...imgsPayload
        }
      });

      const alert = document.createElement('div');
      alert.innerText = 'Successful change!';
      alert.setAttribute('class', 'alert');

      document.body.append(alert);
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    } catch (err) {
      const alert = document.createElement('div');
      alert.innerText = 'Something went wrong!\n' + err;
      alert.setAttribute('class', 'alert alert--bad');

      document.body.append(alert);
      setTimeout(() => document.querySelector('.alert').remove(), 6000);
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

  // PROJECT INFO
  const $projectInfo = document.getElementById('project_info');
  const $projectInfoForms = $projectInfo.querySelectorAll('.admin__item form');
  const $projectInfoSaveButtons = $projectInfo.querySelectorAll('.project-info-save');
  const $projectInfoDeleteButtons = $projectInfo.querySelectorAll('.project-info-delete');
  const $projectInfoImages = $projectInfo.querySelectorAll('.admin__item form .link img');
  const $projectInfoAdd = document.getElementById('project_info_add');

  $projectInfoSaveButtons.forEach((button, index) => {
    button.addEventListener('click', async (evt) => {
      evt.preventDefault();

      const textareasPayload = zeitgeber.extractRequestPayload($projectInfoForms[index], 'textarea', 'value');
      const imgsPayload = zeitgeber.extractRequestPayload($projectInfoForms[index], 'img', 'src');

      try {
        await zeitgeber.sendHttpRequest('PUT', '/admin?to=projectInfo', {
          projectInfo: {
            id: $projectInfoForms[index].id,
            ...textareasPayload,
            ...imgsPayload
          }
        });

        const alert = document.createElement('div');
        alert.innerText = 'Successful change!';
        alert.setAttribute('class', 'alert');

        document.body.append(alert);
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
      } catch (err) {
        const alert = document.createElement('div');
        alert.innerText = 'Something went wrong!\n' + err;
        alert.setAttribute('class', 'alert alert--bad');

        document.body.append(alert);
        setTimeout(() => document.querySelector('.alert').remove(), 6000);
        console.error(err, err.data);
      }
    });
  });

  $projectInfoDeleteButtons.forEach((button, index) => {
    button.addEventListener('click', async (evt) => {
      evt.preventDefault();

      try {
        await zeitgeber.sendHttpRequest('DELETE', `/admin?from=projectInfo&id=${$projectInfoForms[index].id}`);
        $projectInfoForms[index].parentElement.remove();

        const alert = document.createElement('div');
        alert.innerText = 'Successful change!';
        alert.setAttribute('class', 'alert');

        document.body.append(alert);
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
      } catch (err) {
        const alert = document.createElement('div');
        alert.innerText = 'Something went wrong!\n' + err;
        alert.setAttribute('class', 'alert alert--bad');

        document.body.append(alert);
        setTimeout(() => document.querySelector('.alert').remove(), 6000);
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
          const $save = node.querySelector('.project-info-save');
          const $delete = node.querySelector('.project-info-delete');

          $save.addEventListener('click', async function _listener(evt) {
            evt.preventDefault();

            const textareasPayload = zeitgeber.extractRequestPayload($form, 'textarea', 'value');
            const imgsPayload = zeitgeber.extractRequestPayload($form, 'img', 'src');

            try {
              const { data } = await zeitgeber.sendHttpRequest('POST', '/admin?to=projectInfo', {
                projectInfo: {
                  ...textareasPayload,
                  ...imgsPayload
                }
              });

              $form.setAttribute('id', data.id);
              $save.removeEventListener('click', _listener);
              $save.addEventListener('click', async (evt) => {
                evt.preventDefault();

                const textareasPayload = zeitgeber.extractRequestPayload($form, 'textarea', 'value');
                const imgsPayload = zeitgeber.extractRequestPayload($form, 'img', 'src');

                try {
                  await zeitgeber.sendHttpRequest('PUT', '/admin?to=projectInfo', {
                    projectInfo: {
                      id: $form.id,
                      ...textareasPayload,
                      ...imgsPayload
                    }
                  });

                  const alert = document.createElement('div');
                  alert.innerText = 'Successful change!';
                  alert.setAttribute('class', 'alert');

                  document.body.append(alert);
                  setTimeout(() => document.querySelector('.alert').remove(), 3000);
                } catch (err) {
                  const alert = document.createElement('div');
                  alert.innerText = 'Something went wrong!\n' + err;
                  alert.setAttribute('class', 'alert alert--bad');

                  document.body.append(alert);
                  setTimeout(() => document.querySelector('.alert').remove(), 6000);
                  console.error(err, err.data);
                }
              });

              const alert = document.createElement('div');
              alert.innerText = 'Successful change!';
              alert.setAttribute('class', 'alert');

              document.body.append(alert);
              setTimeout(() => document.querySelector('.alert').remove(), 3000);
            } catch (err) {
              const alert = document.createElement('div');
              alert.innerText = 'Something went wrong!\n' + err;
              alert.setAttribute('class', 'alert alert--bad');

              document.body.append(alert);
              setTimeout(() => document.querySelector('.alert').remove(), 6000);
              console.error(err, err.data);
            }
          });

          $delete.addEventListener('click', async (evt) => {
            evt.preventDefault();

            if ($form.id === '') {
              node.remove();
            }

            try {
              await zeitgeber.sendHttpRequest('DELETE', `/admin?from=projectInfo&id=${$form.id}`);
              node.remove();

              const alert = document.createElement('div');
              alert.innerText = 'Successful change!';
              alert.setAttribute('class', 'alert');

              document.body.append(alert);
              setTimeout(() => document.querySelector('.alert').remove(), 3000);
            } catch (err) {
              const alert = document.createElement('div');
              alert.innerText = 'Something went wrong!\n' + err;
              alert.setAttribute('class', 'alert alert--bad');

              document.body.append(alert);
              setTimeout(() => document.querySelector('.alert').remove(), 6000);
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
