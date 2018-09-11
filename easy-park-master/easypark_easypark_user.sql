-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: easypark
-- ------------------------------------------------------
-- Server version	5.7.14

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `easypark_admin`
--

DROP TABLE IF EXISTS `easypark_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `easypark_admin` (
  `id` varchar(36) NOT NULL,
  `username` varchar(60) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(32) NOT NULL DEFAULT '' COMMENT '密码',
  `register_time` int(13) unsigned NOT NULL DEFAULT '0' COMMENT '注册时间',
  `login_time` int(13) unsigned NOT NULL DEFAULT '0' COMMENT '登录时间',
  `nickname` varchar(60) NOT NULL COMMENT '昵称',
  `mobile` varchar(20) NOT NULL COMMENT '手机号码',
  `access` varchar(100) NOT NULL COMMENT '权限',
  `avator` varchar(200) NOT NULL COMMENT '图像地址',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `easypark_admin`
--

LOCK TABLES `easypark_admin` WRITE;
/*!40000 ALTER TABLE `easypark_admin` DISABLE KEYS */;
INSERT INTO `easypark_admin` VALUES ('67309e30-acf3-11e8-8981-95bf742aa11c','super_admin','a1300901254d6823d4a8fd6d217c6feb',2018,2018,'超级管理员','13312345678','[\'super_admin\', \'admin\']','https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png');
/*!40000 ALTER TABLE `easypark_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `easypark_carbarn`
--

DROP TABLE IF EXISTS `easypark_carbarn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `easypark_carbarn` (
  `user_id` varchar(36) NOT NULL DEFAULT '' COMMENT '用户id,用于关联用户表',
  `park_id` varchar(36) NOT NULL DEFAULT '' COMMENT '车位ID',
  `park_no` varchar(36) NOT NULL DEFAULT '0' COMMENT '车位编号',
  `city` varchar(45) NOT NULL DEFAULT '' COMMENT '城市名',
  `address` varchar(145) NOT NULL DEFAULT '' COMMENT '地址',
  `park_status` int(11) NOT NULL DEFAULT '0' COMMENT '''车位状态编号：0-启用; 1-关闭; 2-维护'',',
  `use_status` int(11) NOT NULL DEFAULT '0' COMMENT '使用状态： 0-空闲; 1-使用中',
  `register_time` varchar(19) NOT NULL DEFAULT '' COMMENT '车位登记时间',
  `price` decimal(10,0) NOT NULL DEFAULT '0' COMMENT '停车单价/小时',
  PRIMARY KEY (`park_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `easypark_carbarn`
--

LOCK TABLES `easypark_carbarn` WRITE;
/*!40000 ALTER TABLE `easypark_carbarn` DISABLE KEYS */;
INSERT INTO `easypark_carbarn` VALUES ('111','111','123','123321','123213',0,1,'2018-09-10 15:41:15',1),('111','69139720-b4d7-11e8-926b-55cbd8e4316b','124','上海','张江',1,1,'2018-09-10 16:56:30',1);
/*!40000 ALTER TABLE `easypark_carbarn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `easypark_park_order`
--

DROP TABLE IF EXISTS `easypark_park_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `easypark_park_order` (
  `park_id` varchar(36) NOT NULL DEFAULT '' COMMENT '车位ID, 用于关联车位表',
  `order_id` varchar(36) NOT NULL DEFAULT '' COMMENT '订单id',
  `order_no` varchar(36) NOT NULL DEFAULT '' COMMENT '订单编号',
  `order_status` int(1) NOT NULL DEFAULT '0' COMMENT '订单状态 0:未支付 1：已支付: 2: 欠款',
  `car_no` varchar(8) NOT NULL DEFAULT '' COMMENT '车牌编号',
  `mobile` varchar(20) NOT NULL COMMENT '手机号码',
  `strat_time` varchar(19) NOT NULL DEFAULT '' COMMENT '开始时间',
  `end_time` varchar(19) NOT NULL DEFAULT '' COMMENT '结束时间',
  `is_timeout` int(1) NOT NULL DEFAULT '0' COMMENT '是否超时: 0:否; 1:是',
  `over_time` varchar(19) NOT NULL DEFAULT '' COMMENT '超时时间',
  `price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '停车单价/小时',
  `total` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '总计金额',
  `pay_type` varchar(10) NOT NULL DEFAULT '' COMMENT '支付方式',
  `voucherNo` varchar(6) NOT NULL DEFAULT '' COMMENT '支付凭证号',
  `non_payment` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '欠费金额',
  `is_inform` int(1) NOT NULL DEFAULT '0' COMMENT '是否通知: 0 未通知; 1 已经通知',
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `easypark_park_order`
--

LOCK TABLES `easypark_park_order` WRITE;
/*!40000 ALTER TABLE `easypark_park_order` DISABLE KEYS */;
INSERT INTO `easypark_park_order` VALUES ('111','069a9a30-b595-11e8-a188-7b15b977439d','0001',1,'沪A88888','13312341234','2018-9-11 15:18:14','2018-9-11 20:18:14',0,'0',10.00,50.00,'现金','123456',0.00,0),('111','f8a47eb0-b593-11e8-8ac5-e73318ff2983','0001',1,'沪A88888','13312341234','2018-9-11 15:18:14','2018-9-11 20:18:14',0,'0',10.00,50.00,'现金','123456',0.00,0);
/*!40000 ALTER TABLE `easypark_park_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `easypark_user`
--

DROP TABLE IF EXISTS `easypark_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `easypark_user` (
  `id` varchar(36) NOT NULL,
  `username` varchar(60) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(32) NOT NULL DEFAULT '' COMMENT '密码',
  `register_time` varchar(19) NOT NULL DEFAULT '0' COMMENT '注册时间',
  `nickname` varchar(60) NOT NULL COMMENT '昵称',
  `mobile` varchar(20) NOT NULL COMMENT '手机号码',
  `pos_sn` varchar(30) NOT NULL COMMENT 'pos sn',
  `mer_no` varchar(30) NOT NULL COMMENT '商户号',
  `ter_no` varchar(20) NOT NULL COMMENT '终端号',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=294065 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `easypark_user`
--

LOCK TABLES `easypark_user` WRITE;
/*!40000 ALTER TABLE `easypark_user` DISABLE KEYS */;
INSERT INTO `easypark_user` VALUES ('1','super_admin','12345','1234545','小曹','13312341234','84569552','123123213213','1233213'),('294064','1','e7b287a100ce76000dcb3ec9f5699250','2018','1','1','000001041752CA838303','',''),('eecb1260-b0e7-11e8-80e7-7104b425cbd5','2','e7b287a100ce76000dcb3ec9f5699250','2018','1','1','000001041752CA838303','',''),('5f187620-b0e8-11e8-80e7-7104b425cbd5','3','e7b287a100ce76000dcb3ec9f5699250','2018','1','1','000001041752CA838303','',''),('0a0da670-b0eb-11e8-92f0-733352dc80c9','5656','a1300901254d6823d4a8fd6d217c6feb','2018-09-05 17:06:56','5899','13589','000001041752CA838303','',''),('59106550-b0eb-11e8-a2a2-5754b7a28754','56561','a1300901254d6823d4a8fd6d217c6feb','2018-09-05 17:09:09','5899','13589','000001041752CA838303','',''),('8cda9ae0-b0eb-11e8-94ca-6d6f093c7060','565615','a1300901254d6823d4a8fd6d217c6feb','2018-09-05 17:10:36','5899','13589','000001041752CA838303','',''),('a9d4d160-b0eb-11e8-ab85-e166ad629ade','6855','a1300901254d6823d4a8fd6d217c6feb','2018-09-05 17:11:24','598','5845','000001041752CA838303','',''),('4a2095a0-b0ec-11e8-bd27-5f7118bbd0c1','test1','8456bb2e9e383000bc300b4057977b5d','2018-09-05 17:15:53','123','123321','123213','',''),('cafc6870-b0ec-11e8-ada8-57f26733a0c8','5698','a1300901254d6823d4a8fd6d217c6feb','2018-09-05 17:19:29','599','5999','000001041752CA838303','',''),('f8d88530-b0ec-11e8-ada8-57f26733a0c8','6663','a1300901254d6823d4a8fd6d217c6feb','2018-09-05 17:20:46','599','123456','000001041752CA838303','',''),('07f5ff20-b0ed-11e8-ada8-57f26733a0c8','66631','a1300901254d6823d4a8fd6d217c6feb','2018-09-05 17:21:12','599','123456','000001041752CA838303','','');
/*!40000 ALTER TABLE `easypark_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-11 18:06:28
