const UserDAO = require('./auth.dao'); // Supondo que exista um DAO para manipular os dados de usuários
const { BadRequestError, UnauthorizedError } = require('../../errors'); // Erros personalizados
const {
  hashPassword,
  comparePassword,
  generateToken,
} = require('../../utils/auth'); // Funções de autenticação
// Função para registrar um novo usuário
const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Validação básica
  if (!username || !email || !password) {
    throw new BadRequestError('Todos os campos são obrigatórios!');
  }

  // Verifica se o e-mail já está cadastrado
  const existingUser = await UserDAO.getByEmail(email);
  if (existingUser) {
    throw new BadRequestError('Este e-mail já está em uso!');
  }

  // Hash da senha e criação do usuário
  const hashedPassword = await hashPassword(password);
  const user = await UserDAO.create({
    username,
    email,
    password: hashedPassword,
  });

  return res.status(201).json({
    success: true,
    message: 'Usuário registrado com sucesso!',
    data: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });
};

// Função para login
const login = async (req, res) => {
  const { email, password } = req.body;

  // Validação básica
  if (!email || !password) {
    throw new BadRequestError('E-mail e senha são obrigatórios!');
  }

  // Busca o usuário pelo e-mail
  const user = await UserDAO.getByEmail(email);
  if (!user) {
    throw new UnauthorizedError('Credenciais inválidas!');
  }

  // Verifica se a senha está correta
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedError('Credenciais inválidas!');
  }

  // Gera o token JWT
  const token = generateToken({ id: user.id_usuario, username: user.username });

  return res.status(200).json({
    success: true,
    message: 'Login realizado com sucesso!',
    data: {
      id: user.id,
      username: user.username,
      email: user.email,
      token,
    },
  });
};

// Função para obter informações do usuário autenticado
const getProfile = async (req, res) => {
  const { user } = req; // O middleware de autenticação deve injetar o usuário no request

  if (!user) {
    throw new UnauthorizedError('Usuário não autenticado!');
  }

  return res.status(200).json({
    id: user.id,
    username: user.username,
    email: user.email,
  });
};

module.exports = { register, login, getProfile };
