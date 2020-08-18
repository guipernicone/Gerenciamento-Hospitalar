/*=========================Tableas====================================*/


USE sql10268158;


create table if not exists nivel (
	id_nivel int not null primary key auto_increment,
	nome_nivel varchar(10)
)ENGINE=InnoDB;

insert into nivel (nome_nivel) values("basico");
insert into nivel (nome_nivel) values("admin");

create table if not exists usuario (
	id_user int not null primary key auto_increment,
	nome_user varchar(50),
	email_user varchar(50),
	senha_user varchar(50),
	id_nivel_user int not null,
	foreign key (id_nivel_user) references nivel(id_nivel)
)ENGINE=InnoDB;

insert into usuario (nome_user,email_user,senha_user,id_nivel_user) values("admin","admin","admin",2);

create table if not exists pacientes (
	id_pac int not null primary key auto_increment,
	nome_pac varchar(50),
	sexo varchar(10),
	idade int not null,
	endereco_pac varchar(50),
	rg_pac varchar(20),
	cpf_pac varchar(20),
	telefone_pac varchar(20),
	quadro_hospilar_pac varchar(20),
	convenio_pac varchar(5)
)ENGINE=InnoDB;



create table if not exists medicos(
	id_med  int not null primary key auto_increment,
	nome_med varchar(50),
	especializacao_med varchar(30),
	endereco_med varchar(50),
	rg_med varchar(20),
	cpf_med varchar(20),
	telefone_med varchar(20),
	hora_de_entrada_med varchar(10),
	hora_de_saida_med varchar(10)
) ENGINE=InnoDB;

create table if not exists enfermeiras(
	id_enf int not null primary key auto_increment,
	nome_enf varchar(50),
	endereco_enf varchar(50),
	rg_enf varchar(20),
	cpf_enf varchar(20),
	telefone_enf varchar(20),
	hora_de_entrada_enf varchar(10),
	hora_de_saida_enf varchar(10)
) ENGINE=InnoDB;

create table if not exists salas(
	id_sala int not null primary key auto_increment,
	numero_sala varchar(5),
	especializacao varchar(25)
) ENGINE=InnoDB;

create table if not exists recursos_hospitalares(
	recursos varchar(20) primary key,
	quantidade int not null,
	quantidade_minima int not null

) ENGINE=InnoDB;

create table if not exists consultas(
	id_cons int not null primary key auto_increment,
	id_pac_cons int not null,
	id_med_cons int not null,
	id_sala_cons int not null,
	horario_cons varchar(10),
	data_cons timestamp,
	recursos_cons varchar(20),
	qtde_rec_cons int not null,
	foreign key (id_pac_cons) references pacientes(id_pac),
	foreign key (id_med_cons) references medicos(id_med),
	foreign key (id_sala_cons) references salas(id_sala),
	foreign key (recursos_cons) references recursos_hospitalares(recursos)
) ENGINE=InnoDB;

create table if not exists cirurgias(
	id_cir int not null primary key auto_increment,
	id_pac_cir int not null,
	id_med_cir int not null,
	id_enf_cir int not null,
	id_sala_cir int not null,
	cod_tc_cir int not null,
	recursos_cir varchar(20),
	qtde_rec_cir int not null,
	horario_cir varchar(10),
	data_cir timestamp,
	foreign key (id_pac_cir) references pacientes(id_pac),
	foreign key (id_med_cir) references medicos(id_med),
	foreign key (id_sala_cir) references salas(id_sala),
	foreign key (recursos_cir) references recursos_hospitalares(recursos)
) ENGINE=InnoDB;

create table if not exists tipos_cirurgias(
	cod_tc int not null primary key auto_increment,
	nome_tc varchar(20)
) ENGINE=InnoDB;

create table if not exists historico(
	id_hist int not null primary key auto_increment,
	id_cir_hist int not null,
	id_cons_hist int not null,
	foreign key (id_cir_hist) references cirurgias(id_cir),
	foreign key (id_cons_hist) references consultas(id_cons)
)ENGINE=InnoDB;

/*=====================Data log=====================================================*/
/*
delimiter $$
create trigger trg_salva_hist after insert on consultas for each row
begin
	insert into historico (id_cons_hist) VALUES (1);
end$$
*/
/*Insert na tabela Historico*/
/*
create trigger trg_salva_hist_2 after insert on cirurgias for each row
begin
	insert into historico (id_cir_hist) values(NEW.id_cir);
end$$

*/
/*Atualiza tabela Recursos*/
/*
create trigger trg_att_rec after insert on consultas for each row
begin
	update recursos_hospitalares
	set quantidade = quantidade - NEW.qtde_rec_cons
	where recursos = NEW.recursos_cons;
end$$
delimiter ;*/