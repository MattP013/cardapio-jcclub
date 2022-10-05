-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 03-Out-2022 às 04:53
-- Versão do servidor: 10.4.24-MariaDB
-- versão do PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `tb_jccoffe`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_categoria`
--

CREATE TABLE `tb_categoria` (
  `cd_categoria` int(10) NOT NULL,
  `nm_categoria` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_categoria`
--

INSERT INTO `tb_categoria` (`cd_categoria`, `nm_categoria`) VALUES
(1, 'Snacks'),
(2, 'Bebidas');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_produto`
--

CREATE TABLE `tb_produto` (
  `cd_produto` int(10) NOT NULL,
  `nm_produto` varchar(222) NOT NULL,
  `cd_quantidade` int(10) NOT NULL,
  `vl_produto` float NOT NULL,
  `ic_ativo` int(1) NOT NULL,
  `cd_categoria` int(10) NOT NULL,
  `img_produto` varchar(222) NOT NULL,
  `dt_ocorrencia` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_produto`
--

INSERT INTO `tb_produto` (`cd_produto`, `nm_produto`, `cd_quantidade`, `vl_produto`, `ic_ativo`, `cd_categoria`, `img_produto`, `dt_ocorrencia`) VALUES
(1, 'Pão de Mel', 1, 7, 1, 1, 'logo-jc.jpg', '0000-00-00'),
(2, 'Mochaccino Canela', 1, 3, 1, 2, 'logo-jc.jpg', '0000-00-00'),
(3, 'Poosh', 1, 0.3, 1, 1, 'logo-jc.jpg', '0000-00-00'),
(4, 'Bib\'s Mousse de Limão', 1, 3, 1, 1, 'logo-jc.jpg', '0000-00-00'),
(5, 'Trento', 1, 3, 1, 1, 'logo-jc.jpg', '0000-00-00'),
(6, 'Café au Lalt', 1, 3, 1, 2, 'logo-jc.jpg', '0000-00-00'),
(7, 'Trento Nuts', 1, 3, 1, 1, 'logo-jc.jpg', '0000-00-00'),
(8, 'Freegells', 1, 2, 1, 1, 'logo-jc.jpg', '0000-00-00');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `tb_categoria`
--
ALTER TABLE `tb_categoria`
  ADD PRIMARY KEY (`cd_categoria`);

--
-- Índices para tabela `tb_produto`
--
ALTER TABLE `tb_produto`
  ADD PRIMARY KEY (`cd_produto`),
  ADD KEY `cd_categoria` (`cd_categoria`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tb_categoria`
--
ALTER TABLE `tb_categoria`
  MODIFY `cd_categoria` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tb_produto`
--
ALTER TABLE `tb_produto`
  MODIFY `cd_produto` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `tb_produto`
--
ALTER TABLE `tb_produto`
  ADD CONSTRAINT `cd_categoria` FOREIGN KEY (`cd_categoria`) REFERENCES `tb_categoria` (`cd_categoria`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
