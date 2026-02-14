// ===== Type Definitions =====
interface LoginCredentials {
    email: string;
    password: string;
    remember?: boolean;
}

interface LoginResponse {
    success: boolean;
    token: string;
    user: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        role: 'admin' | 'staff';
    };
}

// ===== Admin Login Manager =====
class AdminLoginManager {
    private form: HTMLFormElement | null;
    private emailInput: HTMLInputElement | null;
    private passwordInput: HTMLInputElement | null;
    private rememberCheckbox: HTMLInputElement | null;
    private togglePasswordBtn: HTMLElement | null;
    private loginBtn: HTMLButtonElement | null;
    private errorMessage: HTMLElement | null;
    private errorText: HTMLElement | null;

    constructor() {
        this.form = document.getElementById('adminLoginForm') as HTMLFormElement;
        this.emailInput = document.getElementById('email') as HTMLInputElement;
        this.passwordInput = document.getElementById('password') as HTMLInputElement;
        this.rememberCheckbox = document.getElementById('remember') as HTMLInputElement;
        this.togglePasswordBtn = document.getElementById('togglePassword');
        this.loginBtn = document.getElementById('loginBtn') as HTMLButtonElement;
        this.errorMessage = document.getElementById('errorMessage');
        this.errorText = document.getElementById('errorText');

        this.init();
    }

    private init(): void {
        this.setupEventListeners();
        this.checkExistingSession();
        this.loadRememberedEmail();
    }

    private setupEventListeners(): void {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        if (this.togglePasswordBtn) {
            this.togglePasswordBtn.addEventListener('click', () => this.togglePassword());
        }
    }

    private togglePassword(): void {
        if (!this.passwordInput || !this.togglePasswordBtn) return;

        const icon = this.togglePasswordBtn.querySelector('i');
        if (this.passwordInput.type === 'password') {
            this.passwordInput.type = 'text';
            if (icon) {
                icon.className = 'fas fa-eye-slash';
            }
        } else {
            this.passwordInput.type = 'password';
            if (icon) {
                icon.className = 'fas fa-eye';
            }
        }
    }

    private async handleSubmit(e: Event): Promise<void> {
        e.preventDefault();

        if (!this.emailInput || !this.passwordInput) return;

        const credentials: LoginCredentials = {
            email: this.emailInput.value,
            password: this.passwordInput.value,
            remember: this.rememberCheckbox?.checked
        };

        this.setLoading(true);
        this.hideError();

        try {
            const response = await this.login(credentials);
            
            if (response.success) {
                // Store session
                this.storeSession(response);
                
                // Remember email if checked
                if (credentials.remember) {
                    localStorage.setItem('rememberedEmail', credentials.email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }

                // Redirect to dashboard
                window.location.href = 'admin-dashboard.html';
            } else {
                this.showError('Invalid credentials. Please try again.');
            }
        } catch (error) {
            this.showError('Login failed. Please check your credentials and try again.');
            console.error('Login error:', error);
        } finally {
            this.setLoading(false);
        }
    }

    private async login(credentials: LoginCredentials): Promise<LoginResponse> {
        try {
            const response = await fetch('/api/auth/admin-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            // Demo mode - use hardcoded credentials
            if (credentials.email === 'admin@noorulhaq.org' && credentials.password === 'admin123') {
                return {
                    success: true,
                    token: 'demo-token-' + Date.now(),
                    user: {
                        id: 1,
                        email: credentials.email,
                        firstName: 'Admin',
                        lastName: 'User',
                        role: 'admin'
                    }
                };
            }
            throw error;
        }
    }

    private storeSession(response: LoginResponse): void {
        sessionStorage.setItem('adminToken', response.token);
        sessionStorage.setItem('adminUser', JSON.stringify(response.user));
    }

    private checkExistingSession(): void {
        const token = sessionStorage.getItem('adminToken');
        if (token) {
            // Already logged in, redirect to dashboard
            window.location.href = 'admin-dashboard.html';
        }
    }

    private loadRememberedEmail(): void {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail && this.emailInput && this.rememberCheckbox) {
            this.emailInput.value = rememberedEmail;
            this.rememberCheckbox.checked = true;
        }
    }

    private setLoading(loading: boolean): void {
        if (!this.loginBtn) return;

        const btnText = this.loginBtn.querySelector('.btn-text');
        const btnLoading = this.loginBtn.querySelector('.btn-loading');

        if (loading) {
            this.loginBtn.disabled = true;
            if (btnText) (btnText as HTMLElement).style.display = 'none';
            if (btnLoading) (btnLoading as HTMLElement).style.display = 'inline-flex';
        } else {
            this.loginBtn.disabled = false;
            if (btnText) (btnText as HTMLElement).style.display = 'inline';
            if (btnLoading) (btnLoading as HTMLElement).style.display = 'none';
        }
    }

    private showError(message: string): void {
        if (this.errorMessage && this.errorText) {
            this.errorText.textContent = message;
            this.errorMessage.style.display = 'flex';
        }
    }

    private hideError(): void {
        if (this.errorMessage) {
            this.errorMessage.style.display = 'none';
        }
    }
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    new AdminLoginManager();
});

// ===== Export =====
export { AdminLoginManager, LoginCredentials, LoginResponse };
