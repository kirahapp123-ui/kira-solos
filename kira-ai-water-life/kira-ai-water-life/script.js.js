/* KIRA — small, dependency-free interactions. The survey intentionally does not transmit or store data. */
(() => {
  'use strict';

  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#primary-nav');

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      navigation.classList.toggle('is-open', !isOpen);
    });
    navigation.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuButton.setAttribute('aria-expanded', 'false');
        navigation.classList.remove('is-open');
      });
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        menuButton.setAttribute('aria-expanded', 'false');
        navigation.classList.remove('is-open');
        menuButton.focus();
      }
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  const form = document.querySelector('#kira-survey');
  if (!form) return;

  const errorBox = document.querySelector('#form-error');
  const successBox = document.querySelector('#form-success');
  const suggestions = form.elements.namedItem('suggestions');
  const charCount = document.querySelector('#char-count');

  if (suggestions && charCount) {
    suggestions.addEventListener('input', () => {
      charCount.textContent = `${suggestions.value.length} / 800`;
    });
  }

  function showError(message) {
    errorBox.textContent = message;
    errorBox.hidden = false;
    successBox.hidden = true;
    errorBox.focus?.();
  }

  function clearMessages() {
    errorBox.hidden = true;
    successBox.hidden = true;
    errorBox.textContent = '';
    successBox.textContent = '';
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearMessages();

    // Optional age/region/comment fields are deliberately not required.
    const requiredGroups = [
      { name: 'familiarity', label: 'how familiar you are with AI data centres' },
      { name: 'electricityWater', label: 'whether you knew electricity generation can use water' },
      { name: 'solution', label: 'which solution should receive more attention' },
      { name: 'transparency', label: 'your view on water-use transparency' }
    ];

    for (const group of requiredGroups) {
      const field = form.elements.namedItem(group.name);
      let hasValue = false;
      if (field instanceof RadioNodeList) hasValue = Boolean(field.value);
      else if (field) hasValue = Boolean(field.value.trim());
      if (!hasValue) {
        showError(`Please answer: ${group.label}.`);
        const target = form.querySelector(`[name="${group.name}"]`);
        if (target) target.focus();
        return;
      }
    }

    if (!form.querySelector('input[name="impacts"]:checked')) {
      showError('Please select at least one environmental impact that concerns you.');
      form.querySelector('input[name="impacts"]')?.focus();
      return;
    }

    if (suggestions && suggestions.value.length > 800) {
      showError('Please keep the optional comment to 800 characters or fewer.');
      suggestions.focus();
      return;
    }

    // No fetch(), external endpoint, localStorage or cookie is used here.
    successBox.textContent = 'Your answers passed the form checks in this browser. They have NOT been sent to KIRA or saved. Connect a real collection service before inviting people to submit research data.';
    successBox.hidden = false;
    successBox.focus?.();
    successBox.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
  });

  form.addEventListener('input', (event) => {
    if (event.target.matches('input, select, textarea')) {
      errorBox.hidden = true;
      successBox.hidden = true;
    }
  });
})();
