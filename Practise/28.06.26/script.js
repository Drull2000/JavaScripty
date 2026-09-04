function setCookie(name, value, hours = 1) {
    const date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split(';');

    for (const cookie of cookies) {
        const item = cookie.trim();

        if (item.startsWith(name + '=')) {
            return decodeURIComponent(item.substring(name.length + 1));
        }
    }

    return null;
}

function saveSessionData(name, value) {
    setCookie(name, value, 1);
    try {
        localStorage.setItem(name, value);
    } catch (error) {
        
    }
}

function readSessionData(name) {
    return getCookie(name) || localStorage.getItem(name);
}

function deleteSessionData(name) {
    deleteCookie(name);
    try {
        localStorage.removeItem(name);
    } catch (error) {
        
    }
}

function validateEmail(value) {
    if (!value) return 'Email is required';
    if (!/^[A-Za-z0-9._-]+@[^@\s]+\.[A-Za-z]{2,}$/.test(value)) {
        return 'Wrong email address';
    }
    const beforeAt = value.split('@')[0];
    if (beforeAt.length < 3) {
        return 'At least 3 characters before @';
    }
    return '';
}

function validatePassword(value) {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Minimum 6 characters';
    if (!/[a-z]/.test(value)) return 'Need 1 lowercase letter';
    if (!/[A-Z]/.test(value)) return 'Need 1 uppercase letter';
    if (!/\d/.test(value)) return 'Need 1 number';
    return '';
}

function validateRepeatPassword(password, repeat) {
    if (!repeat) return 'Repeat password is required';
    if (password !== repeat) return 'Passwords must match';
    return '';
}

function validateName(value) {
    if (!value) return 'Name is required';
    if (value.length > 20) return 'Maximum 20 characters';
    if (!/^[A-Za-zА-Яа-яІіЇїЄєҐґ]+$/.test(value)) return 'Only letters';
    return '';
}

function validateLastName(value) {
    if (!value) return 'Last name is required';
    if (value.length > 20) return 'Maximum 20 characters';
    if (!/^[A-Za-zА-Яа-яІіЇїЄєҐґ]+$/.test(value)) return 'Only letters';
    return '';
}

function validateBirthYear(value) {
    if (!value) return 'Year of birth is required';
    const year = Number(value);
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) return 'Year between 1900 and current year';
    return '';
}

function validateGender(value) {
    if (!value) return 'Gender is required';
    return '';
}

function validatePhone(value) {
    if (!value) return '';
    if (!/^[0-9\s()\-]+$/.test(value)) return 'Only numbers, spaces, brackets, hyphen';
    const digits = value.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 12) return 'Number must contain 10 to 12 digits';
    return '';
}

function validateSkype(value) {
    if (!value) return '';
    if (!/^[A-Za-z0-9.-]+$/.test(value)) return 'Only letters, digits, dot and hyphen';
    return '';
}

function showRegistrationPage() {
    const userData = readSessionData('userData');
    if (userData) {
        window.location.href = 'user.html';
        return;
    }

    const signUpBtn = document.getElementById('signUpBtn');
    if (!signUpBtn) return;

    signUpBtn.addEventListener('click', function () {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const repeatPassword = document.getElementById('repeatPassword').value.trim();

        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        const repeatError = validateRepeatPassword(password, repeatPassword);

        document.getElementById('emailError').textContent = emailError;
        document.getElementById('passwordError').textContent = passwordError;
        document.getElementById('repeatError').textContent = repeatError;

        if (emailError || passwordError || repeatError) {
            return;
        }

        saveSessionData('userData', JSON.stringify({ email, password }));
        window.location.href = 'user.html';
    });
}

function showUserPage() {
    const userData = readSessionData('userData');
    if (!userData) {
        window.location.href = 'index.html';
        return;
    }

    const user = JSON.parse(userData);
    const emailText = document.getElementById('userEmail');
    if (emailText) {
        emailText.textContent = user.email;
    }

    const savedData = readSessionData('userInfo');
    if (savedData) {
        const info = JSON.parse(savedData);
        const fields = [
            ['firstName', 'firstName'],
            ['lastName', 'lastName'],
            ['birthYear', 'birthYear'],
            ['gender', 'gender'],
            ['phone', 'phone'],
            ['skype', 'skype']
        ];

        fields.forEach(([key, elementId]) => {
            const value = info[key];
            if (value !== undefined && value !== null) {
                const input = document.getElementById(elementId);
                if (input) input.value = value;
            }
        });
    }

    const exitBtn = document.getElementById('exitBtn');
    if (exitBtn) {
        exitBtn.addEventListener('click', function () {
            deleteSessionData('userData');
            deleteSessionData('userInfo');
            window.location.href = 'index.html';
        });
    }

    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function () {
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const birthYear = document.getElementById('birthYear').value.trim();
            const gender = document.getElementById('gender').value;
            const phone = document.getElementById('phone').value.trim();
            const skype = document.getElementById('skype').value.trim();

            const firstNameError = validateName(firstName);
            const lastNameError = validateLastName(lastName);
            const birthYearError = validateBirthYear(birthYear);
            const genderError = validateGender(gender);
            const phoneError = validatePhone(phone);
            const skypeError = validateSkype(skype);

            document.getElementById('firstNameError').textContent = firstNameError;
            document.getElementById('lastNameError').textContent = lastNameError;
            document.getElementById('birthYearError').textContent = birthYearError;
            document.getElementById('genderError').textContent = genderError;
            document.getElementById('phoneError').textContent = phoneError;
            document.getElementById('skypeError').textContent = skypeError;

            if (firstNameError || lastNameError || birthYearError || genderError || phoneError || skypeError) {
                return;
            }

            const userInfo = {
                firstName,
                lastName,
                birthYear,
                gender,
                phone,
                skype
            };

            saveSessionData('userInfo', JSON.stringify(userInfo));
        });
    }
}

const pageName = window.location.pathname.split('/').pop() || 'index.html';

if (pageName === 'index.html' || pageName === '' || pageName === '28.06.26') {
    showRegistrationPage();
} else if (pageName === 'user.html') {
    showUserPage();
}
