    // English comments in code as requested.

    // API_BASE - change this to your backend base URL if needed.
    // Example: const API_BASE = 'http://192.168.0.5:8080';

    const API_BASE = 'http://localhost:8080';

    // DOM elements
    const tabSignIn = document.getElementById('tab-signin');
    const tabSignUp = document.getElementById('tab-signup');
    const formSignIn = document.getElementById('form-signin');
    const formSignUp = document.getElementById('form-signup');
    const alertBox = document.getElementById('alert');
    const resultBox = document.getElementById('result');
    const apiBaseLabel = document.getElementById('api-base');

    apiBaseLabel.textContent = API_BASE;

    // Simple UI toggle for tabs
    function setActiveTab(mode) {
      if (mode === 'signin') {
        tabSignIn.classList.add('active');
        tabSignUp.classList.remove('active');
        formSignIn.style.display = '';
        formSignUp.style.display = 'none';
        formSignIn.setAttribute('aria-hidden', 'false');
        formSignUp.setAttribute('aria-hidden', 'true');
      } else {
        tabSignUp.classList.add('active');
        tabSignIn.classList.remove('active');
        formSignUp.style.display = '';
        formSignIn.style.display = 'none';
        formSignUp.setAttribute('aria-hidden', 'false');
        formSignIn.setAttribute('aria-hidden', 'true');
      }
      clearAlert();
    }

    tabSignIn.addEventListener('click', () => setActiveTab('signin'));
    tabSignUp.addEventListener('click', () => setActiveTab('signup'));
    // enable keyboard toggle (Enter/Space)
    [tabSignIn, tabSignUp].forEach(t => {
      t.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          t.click();
        }
      });
    });

    // Helpers: show alert/result
    function showAlert(message, type = 'error') {
      alertBox.textContent = message;
      alertBox.className = 'alert show ' + (type === 'success' ? 'success' : 'error');
      // hide after 5 seconds
      setTimeout(() => {
        alertBox.classList.remove('show');
      }, 5000);
    }

    function clearAlert() {
      alertBox.classList.remove('show');
    }

    function setResult(obj) {
      resultBox.textContent = JSON.stringify(obj, null, 2);
    }

    function setLoading(isLoading, button) {
      if (!button) return;
      if (isLoading) {
        button.disabled = true;
        button.textContent = 'Please wait...';
        button.style.opacity = 0.85;
      } else {
        button.disabled = false;
        // restore text depending on form
        button.textContent = button.id === 'btn-signin' ? 'Sign In' : 'Create account';
        button.style.opacity = 1;
      }
    }

    // Client-side validation helper
    function validateEmail(email) {
      // simple email regex for client-side only
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Sign Up handler
    formSignUp.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Collect values
      const name = document.getElementById('signup-name').value.trim();
      const email = document.getElementById('signup-email').value.trim();
      const password = document.getElementById('signup-password').value;

      // Basic client-side validation
      if (!name) return showAlert('Please enter your full name.');
      if (!validateEmail(email)) return showAlert('Invalid email format.');
      if (password.length < 8) return showAlert('Password must be at least 8 characters.');

      const payload = { name, email, password };

      const button = document.getElementById('btn-signup');
      setLoading(true, button);

      try {
        // Send request to backend - register endpoint
        const res = await fetch(`${API_BASE}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (!res.ok) {
          // If backend returns {message: '...'} or a validation map, try to show it
          const msg = data && (data.message  JSON.stringify(data))  Register failed (${res.status});
          showAlert(msg, 'error');

    setResult({ error: msg, status: res.status });
        } else {
          showAlert('Account created successfully!', 'success');
          setResult(data);
          // After success, switch to sign in and prefill email
          setTimeout(() => {
            setActiveTab('signin');
            document.getElementById('signin-email').value = email;
            document.getElementById('signin-password').focus();
          }, 700);
        }

      } catch (err) {
        showAlert('Network error. Make sure backend is running and CORS is enabled.');
        setResult({ error: String(err) });
      } finally {
        setLoading(false, button);
      }
    });

    // Sign In handler
    formSignIn.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('signin-email').value.trim();
      const password = document.getElementById('signin-password').value;

      if (!validateEmail(email)) return showAlert('Invalid email format.');
      if (!password) return showAlert('Password is required.');

      const payload = { email, password };

      const button = document.getElementById('btn-signin');
      setLoading(true, button);

      try {
        // Send request to backend - login endpoint
        const res = await fetch(`${API_BASE}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (!res.ok) {
          const msg = data && (data.message  JSON.stringify(data))  Login failed (${res.status});
          showAlert(msg, 'error');
          setResult({ error: msg, status: res.status });
        } else {
          showAlert('Logged in successfully!', 'success');
          setResult(data);
          // Optionally do something with returned user data
          // e.g. store user in localStorage (here we don't store password or secret)
          try {
            localStorage.setItem('currentUser', JSON.stringify(data));
          } catch (e) {
            // ignore storage errors
          }
        }

      } catch (err) {
        showAlert('Network error. Make sure backend is running and CORS is enabled.');
        setResult({ error: String(err) });
      } finally {
        setLoading(false, button);
      }
    });

    // Nice UX: clear alerts when input focused
    document.querySelectorAll('input').forEach(input => {
      input.addEventListener('focus', () => clearAlert());
    });

    // Initialize default tab
    setActiveTab('signin');