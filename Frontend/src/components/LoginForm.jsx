import { useForm } from 'react-hook-form';
import { useLogin } from '../hooks/useLogin';

function LoginForm({ onLoggedIn }) {
    const login = useLogin();
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        login.mutate(data, {
            onSuccess: (result) => {
                onLoggedIn(result.token);
            }
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ marginBottom: '1.5rem' }}
        >
            <h3>Iniciar sesión</h3>

            <input
                {...register('username', { required: true })}
                placeholder="Usuario"
            />

            <input
                {...register('password', { required: true })}
                type="password"
                placeholder="Contraseña"
            />

            <button type="submit" disabled={login.isPending}>
                {login.isPending
                    ? 'Iniciando sesión...'
                    : 'Iniciar sesión'}
            </button>

            {login.isError && (
                <p style={{ color: 'crimson' }}>
                    {login.error.message}
                </p>
            )}
        </form>
    );
}

export default LoginForm;