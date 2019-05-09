-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  jeu. 09 mai 2019 à 11:37
-- Version du serveur :  5.7.23
-- Version de PHP :  7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `projetweb`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `IdAdmin` int(11) NOT NULL AUTO_INCREMENT,
  `NomAdmin` varchar(50) NOT NULL,
  `PrenomAdmin` varchar(50) NOT NULL,
  `EmailAdmin` varchar(50) NOT NULL,
  `MdpAdmin` varchar(50) NOT NULL,
  PRIMARY KEY (`IdAdmin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `caracteristique`
--

DROP TABLE IF EXISTS `caracteristique`;
CREATE TABLE IF NOT EXISTS `caracteristique` (
  `IdCaract` int(11) NOT NULL AUTO_INCREMENT,
  `LibelleCaract` varchar(50) NOT NULL,
  PRIMARY KEY (`IdCaract`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `caracteristique`
--

INSERT INTO `caracteristique` (`IdCaract`, `LibelleCaract`) VALUES
(1, 'Sec');

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `IdClient` int(11) NOT NULL AUTO_INCREMENT,
  `NomClient` varchar(50) NOT NULL,
  `PrenomClient` varchar(50) NOT NULL,
  `EmailClient` varchar(50) NOT NULL,
  `AddClient` varchar(50) NOT NULL,
  `CodePostalClient` int(11) NOT NULL,
  `Ville` varchar(50) NOT NULL,
  `PaysClient` varchar(50) NOT NULL,
  `MdpClient` varchar(50) NOT NULL,
  `NumClient` int(11) NOT NULL,
  PRIMARY KEY (`IdClient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

DROP TABLE IF EXISTS `commande`;
CREATE TABLE IF NOT EXISTS `commande` (
  `NumCommande` int(11) NOT NULL AUTO_INCREMENT,
  `DateCommande` date NOT NULL,
  `IdClient` int(11) NOT NULL,
  `IdShamp` int(11) NOT NULL,
  `IdAdmin` int(11) NOT NULL,
  PRIMARY KEY (`NumCommande`),
  KEY `Commande_Client_FK` (`IdClient`),
  KEY `Commande_Shampoing0_FK` (`IdShamp`),
  KEY `Commande_Admin1_FK` (`IdAdmin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `comporter`
--

DROP TABLE IF EXISTS `comporter`;
CREATE TABLE IF NOT EXISTS `comporter` (
  `IdShamp` int(11) NOT NULL,
  `IdComp` int(11) NOT NULL,
  PRIMARY KEY (`IdShamp`,`IdComp`),
  KEY `Comporter_Composant0_FK` (`IdComp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `composant`
--

DROP TABLE IF EXISTS `composant`;
CREATE TABLE IF NOT EXISTS `composant` (
  `IdComp` int(11) NOT NULL AUTO_INCREMENT,
  `LibelleComp` varchar(50) NOT NULL,
  PRIMARY KEY (`IdComp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `correspondre`
--

DROP TABLE IF EXISTS `correspondre`;
CREATE TABLE IF NOT EXISTS `correspondre` (
  `IdCaract` int(11) NOT NULL,
  `IdShamp` int(11) NOT NULL,
  PRIMARY KEY (`IdCaract`,`IdShamp`),
  KEY `Correspondre_Shampoing0_FK` (`IdShamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `shampoing`
--

DROP TABLE IF EXISTS `shampoing`;
CREATE TABLE IF NOT EXISTS `shampoing` (
  `IdShamp` int(11) NOT NULL AUTO_INCREMENT,
  `NomShamp` varchar(50) NOT NULL,
  `PrixShamp` varchar(50) NOT NULL,
  `PoidsShamp` varchar(50) NOT NULL,
  `IdAdmin` int(11) NOT NULL,
  PRIMARY KEY (`IdShamp`),
  KEY `Shampoing_Admin_FK` (`IdAdmin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commande`
--
ALTER TABLE `commande`
  ADD CONSTRAINT `Commande_Admin1_FK` FOREIGN KEY (`IdAdmin`) REFERENCES `admin` (`IdAdmin`),
  ADD CONSTRAINT `Commande_Client_FK` FOREIGN KEY (`IdClient`) REFERENCES `client` (`IdClient`),
  ADD CONSTRAINT `Commande_Shampoing0_FK` FOREIGN KEY (`IdShamp`) REFERENCES `shampoing` (`IdShamp`);

--
-- Contraintes pour la table `comporter`
--
ALTER TABLE `comporter`
  ADD CONSTRAINT `Comporter_Composant0_FK` FOREIGN KEY (`IdComp`) REFERENCES `composant` (`IdComp`),
  ADD CONSTRAINT `Comporter_Shampoing_FK` FOREIGN KEY (`IdShamp`) REFERENCES `shampoing` (`IdShamp`);

--
-- Contraintes pour la table `correspondre`
--
ALTER TABLE `correspondre`
  ADD CONSTRAINT `Correspondre_Caracteristique_FK` FOREIGN KEY (`IdCaract`) REFERENCES `caracteristique` (`IdCaract`),
  ADD CONSTRAINT `Correspondre_Shampoing0_FK` FOREIGN KEY (`IdShamp`) REFERENCES `shampoing` (`IdShamp`);

--
-- Contraintes pour la table `shampoing`
--
ALTER TABLE `shampoing`
  ADD CONSTRAINT `Shampoing_Admin_FK` FOREIGN KEY (`IdAdmin`) REFERENCES `admin` (`IdAdmin`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
