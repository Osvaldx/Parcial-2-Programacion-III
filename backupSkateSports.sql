-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: SkateSports
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (22,'Matias');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id_product` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  `imagen` varchar(500) DEFAULT NULL,
  `precio` int NOT NULL,
  `categoria` enum('SKATE','ROLLER') DEFAULT NULL,
  `activo` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_product`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Skate tigre ancestral','https://i.postimg.cc/nL0Zq3p7/1.png',35000,'SKATE',1),(2,'Skate Santa Cruz - Maple','https://i.postimg.cc/nznLKXyj/2.png',48000,'SKATE',1),(3,'Skate Element','https://i.postimg.cc/tTmH17pH/3.png',28000,'SKATE',1),(4,'Skate Woodoo Green','https://i.postimg.cc/W4XBKtDJ/4.png',30000,'SKATE',1),(5,'Skate Element Speed','https://i.postimg.cc/kgcMJJ67/5.png',42000,'SKATE',1),(6,'Skate Santa Cruz - Canada','https://i.postimg.cc/449JKb7L/6.png',32000,'SKATE',1),(7,'Skate Zurita rosita','https://i.postimg.cc/sXZRhsXQ/7.png',29500,'SKATE',1),(8,'Skate Personalizado','https://i.postimg.cc/8zK8Xjff/8.png',60000,'SKATE',1),(9,'Skate Clásico','https://i.postimg.cc/BQpRtXg7/9.png',33000,'SKATE',1),(10,'Skate Epifania','https://i.postimg.cc/wvDGzvMV/10.png',45000,'SKATE',1),(11,'Roller Fitness Básico','https://i.postimg.cc/fL7BFrqq/11.png',39000,'ROLLER',1),(12,'Roller Pro Serie X','https://i.postimg.cc/3NSCQ5X1/12.png',55000,'ROLLER',1),(13,'Roller Junior Softline','https://i.postimg.cc/k4MbJYXp/13.png',27000,'ROLLER',1),(14,'Roller Quad Retro','https://i.postimg.cc/XY39JkLd/14.png',31000,'ROLLER',1),(15,'Roller Urban Ride','https://i.postimg.cc/d17yXHQP/15.png',44000,'ROLLER',1),(16,'Roller Ivox','https://i.postimg.cc/FK6fjyyP/16.png',42000,'ROLLER',1),(17,'Roller Kit Kasino','https://i.postimg.cc/MGgTcWwN/17.png',29000,'ROLLER',1),(18,'Roller Performance Stark','https://i.postimg.cc/L8X6Nq6G/18.png',51000,'ROLLER',1),(19,'Roller Freestyle Pro','https://i.postimg.cc/pL4xCqSn/19.png',47000,'ROLLER',1),(20,'Roller SUPREMO uchija','https://i.postimg.cc/RZk5Kq37/20.png',53000,'ROLLER',1);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_admin`
--

DROP TABLE IF EXISTS `usuarios_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_admin` (
  `id_admin` int NOT NULL AUTO_INCREMENT,
  `correo` varchar(50) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  PRIMARY KEY (`id_admin`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_admin`
--

LOCK TABLES `usuarios_admin` WRITE;
/*!40000 ALTER TABLE `usuarios_admin` DISABLE KEYS */;
INSERT INTO `usuarios_admin` VALUES (1,'stefania@bianchi.com','epi','aimi123'),(2,'ronz@ivox.rip','ronz','hola123'),(10,'profesorutn@gmail.com','profesor','1234');
/*!40000 ALTER TABLE `usuarios_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venta_productos`
--

DROP TABLE IF EXISTS `venta_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venta_productos` (
  `id_vp` int NOT NULL AUTO_INCREMENT,
  `id_venta` int DEFAULT NULL,
  `id_product` int DEFAULT NULL,
  `cantidad` int NOT NULL,
  `subtotal` float DEFAULT NULL,
  PRIMARY KEY (`id_vp`),
  KEY `id_venta` (`id_venta`),
  KEY `id_product` (`id_product`),
  CONSTRAINT `venta_productos_ibfk_1` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id_venta`),
  CONSTRAINT `venta_productos_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `productos` (`id_product`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta_productos`
--

LOCK TABLES `venta_productos` WRITE;
/*!40000 ALTER TABLE `venta_productos` DISABLE KEYS */;
INSERT INTO `venta_productos` VALUES (3,10,2,2,96000),(4,10,3,1,28000);
/*!40000 ALTER TABLE `venta_productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventas` (
  `id_venta` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int DEFAULT NULL,
  `fecha_venta` datetime DEFAULT NULL,
  `total` float DEFAULT NULL,
  PRIMARY KEY (`id_venta`),
  KEY `id_cliente` (`id_cliente`),
  CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
INSERT INTO `ventas` VALUES (10,22,'2025-07-10 00:14:14',124000);
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-10  0:22:01
