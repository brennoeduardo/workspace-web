const { mount } = require('@vue/test-utils');
const Login = require('@/components/Login.vue').default;

describe('Login.vue', () => {
  
  test('exibe título "Entrar" ao invés de "Cadastro" quando show.register é falso', async () => {
    const wrapper = mount(Login, {
      data() {
        return {
          show: { register: false }
        };
      },
    });

    expect(wrapper.find('v-card-title').text()).toBe('Entrar');
  });

  test('exibe campos adicionais para "Cadastro" quando show.register é verdadeiro', async () => {
    const wrapper = mount(Login, {
      data() {
        return {
          show: { register: true }
        };
      },
    });

    expect(wrapper.find('input[label="Nome"]').exists()).toBe(true);
    expect(wrapper.find('input[label="Confirme sua senha"]').exists()).toBe(true);
  });

  test('exibe erro ao tentar logar com e-mail inválido', async () => {
    const wrapper = mount(Login);

    // Simula o e-mail e senha
    await wrapper.find('input[label="E-mail"]').setValue('email_invalido');
    await wrapper.find('input[label="Senha"]').setValue('123456');

    // Simula o clique no botão de login
    await wrapper.find('button').trigger('click');

    // Espera que a validação do e-mail falhe
    expect(wrapper.find('.error--text').text()).toBe('E-mail inválido');
  });

  test('faz login com sucesso', async () => {
    const wrapper = mount(Login, {
      mocks: {
        AuthAPI: {
          login: jest.fn().mockResolvedValue({
            success: true,
            token: 'mocked_token'
          })
        }
      }
    });

    await wrapper.find('input[label="E-mail"]').setValue('email@exemplo.com');
    await wrapper.find('input[label="Senha"]').setValue('senhaSegura');

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('login-success');
  });

  test('mostra campo de código de verificação ao logar com conta não confirmada', async () => {
    const wrapper = mount(Login, {
      mocks: {
        AuthAPI: {
          login: jest.fn().mockResolvedValue({
            success: true,
            token: 'mocked_token',
            confirmed: false
          })
        }
      }
    });

    await wrapper.find('input[label="E-mail"]').setValue('email@exemplo.com');
    await wrapper.find('input[label="Senha"]').setValue('senhaSegura');

    await wrapper.find('button').trigger('click');

    expect(wrapper.find('input[label="Código de verificação"]').exists()).toBe(true);
  });
});
