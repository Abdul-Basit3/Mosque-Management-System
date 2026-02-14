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
declare class AdminLoginManager {
    private form;
    private emailInput;
    private passwordInput;
    private rememberCheckbox;
    private togglePasswordBtn;
    private loginBtn;
    private errorMessage;
    private errorText;
    constructor();
    private init;
    private setupEventListeners;
    private togglePassword;
    private handleSubmit;
    private login;
    private storeSession;
    private checkExistingSession;
    private loadRememberedEmail;
    private setLoading;
    private showError;
    private hideError;
}
export { AdminLoginManager, LoginCredentials, LoginResponse };
//# sourceMappingURL=admin-login.d.ts.map