import { Popover } from 'bootstrap';

var poppers = [];
const removeAllPopover = () => {
  poppers.forEach((popper) => popper._hideModalHandler());
};

document.addEventListener('render_async_load', () => {
  var currentSpan;
  const captionContainer = document.querySelector(
    '.caption-container .card-body'
  );

  const spanWords = document.querySelectorAll('span.word');
  spanWords.forEach((spanWord) => {
    const currentPopper = new Popover(spanWord, {
      container: '.main',
      trigger: 'click',
      title: `
        <span>Loading</span>
        <i class="btn-close-popover" role="button"></i>
      `,
      html: true,
      // template: `
      //   <div class="popover" role="tooltip">
      //     <div class="popover-arrow"></div>
      //     <h3 class="popover-header">
      //     </h3>
      //     <div class="popover-body">bbbnbn</div>
      //   </div>`,
      content: `
      <div class="spinner d-flex align-items-center">
        <span>Loading...</span>
        <div class="spinner-border spinner-border-sm ms-auto" role="status" aria-hidden="true"></div>
      </div>`,
    });

    poppers.push(currentPopper);
    spanWord?.addEventListener('shown.bs.popover', (event) => {
      poppers.forEach((popper) => {
        if (
          popper?.tip?.id !==
          event.currentTarget.getAttribute('aria-describedby')
        ) {
          popper._hideModalHandler();
        }
      });

      const btnClosePopover = document.querySelector('.btn-close-popover');
      btnClosePopover?.addEventListener('click', () => removeAllPopover());
    });

    captionContainer?.addEventListener('scroll', () => {
      currentSpan?.removeAttribute('aria-describedby');
      removeAllPopover();
    });

    spanWord?.addEventListener('click', (event) => {
      currentSpan = event.currentTarget;
      const originText = currentSpan.textContent;
      const word = originText.replace(/[^0-9a-zA-Z]/g, '');

      fetch(`/search/${word}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not OK');
          }

          if (response.status === 204) return null;

          return response.text();
        })
        .then((data) => {
          const popover = document.querySelector('.popover');
          const header = popover.querySelector('.popover-header span');
          const body = popover.querySelector('.popover-body');
          header.innerText = originText;

          if (data !== null) {
            body.innerHTML = data;
            if (body.clientHeight > 201) popover.classList.add('h-30');
          } else {
            body.querySelector('span').innerText = 'Not found';
            body.querySelector('.spinner-border').remove();
          }
        })
        .catch((error) => {
          console.error(
            'There has been a problem with your fetch operation:',
            error
          );
        });
    });
  });
});

export { removeAllPopover };
