#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: Client
#------------------------------------------------------------

CREATE TABLE Client(
        NumClient        Int  Auto_increment  NOT NULL ,
        NomClient        Varchar (50) NOT NULL ,
        PrenomClient     Varchar (50) NOT NULL ,
        NumRueClient     Int NOT NULL ,
        RueClient        Varchar (50) NOT NULL ,
        CodePostalClient Int NOT NULL ,
        VilleClient      Varchar (50) NOT NULL ,
        NumTelClient     Int NOT NULL ,
        MailClient       Varchar (50) NOT NULL ,
        MdpClient        Varchar (50) NOT NULL
	,CONSTRAINT Client_PK PRIMARY KEY (NumClient)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: TypeLoc
#------------------------------------------------------------

CREATE TABLE TypeLoc(
        NumType    Int  Auto_increment  NOT NULL ,
        LibeleType Varchar (50) NOT NULL
	,CONSTRAINT TypeLoc_PK PRIMARY KEY (NumType)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Location
#------------------------------------------------------------

CREATE TABLE Location(
        NumLoc         Int  Auto_increment  NOT NULL ,
        LibeleLoc      Varchar (50) NOT NULL ,
        NbPlaceLoc     Int NOT NULL ,
        DescriptifLoc  Varchar (50) NOT NULL ,
        SuperficieLoc  Int NOT NULL ,
        NbChambreLoc   Int NOT NULL ,
        NbSalleBainLoc Int NOT NULL ,
        NumType        Int NOT NULL
	,CONSTRAINT Location_PK PRIMARY KEY (NumLoc)

	,CONSTRAINT Location_TypeLoc_FK FOREIGN KEY (NumType) REFERENCES TypeLoc(NumType)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Reservation
#------------------------------------------------------------

CREATE TABLE Reservation(
        NumResa         Int  Auto_increment  NOT NULL ,
        NbPersResa      Int NOT NULL ,
        DateArriveeResa Date NOT NULL ,
        DateDepartResa  Date NOT NULL ,
        EtatResa        Varchar (50) NOT NULL ,
        NumClient       Int NOT NULL ,
        NumLoc          Int NOT NULL
	,CONSTRAINT Reservation_PK PRIMARY KEY (NumResa)

	,CONSTRAINT Reservation_Client_FK FOREIGN KEY (NumClient) REFERENCES Client(NumClient)
	,CONSTRAINT Reservation_Location0_FK FOREIGN KEY (NumLoc) REFERENCES Location(NumLoc)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Tarif
#------------------------------------------------------------

CREATE TABLE Tarif(
        NumTarif    Int  Auto_increment  NOT NULL ,
        PrixNuit    Int NOT NULL ,
        PrixSemaine Int NOT NULL
	,CONSTRAINT Tarif_PK PRIMARY KEY (NumTarif)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Saison
#------------------------------------------------------------

CREATE TABLE Saison(
        NumSaison       Int  Auto_increment  NOT NULL ,
        DateDebutSaison Date NOT NULL ,
        DateFinSaison   Date NOT NULL ,
        NuitsMinimum    Int NOT NULL
	,CONSTRAINT Saison_PK PRIMARY KEY (NumSaison)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Avis
#------------------------------------------------------------

CREATE TABLE Avis(
        NumAvis         Int  Auto_increment  NOT NULL ,
        NoteAvis        Int NOT NULL ,
        CommentaireAvis Text NOT NULL ,
        NumLoc          Int NOT NULL
	,CONSTRAINT Avis_PK PRIMARY KEY (NumAvis)

	,CONSTRAINT Avis_Location_FK FOREIGN KEY (NumLoc) REFERENCES Location(NumLoc)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: applique
#------------------------------------------------------------

CREATE TABLE applique(
        NumLoc    Int NOT NULL ,
        NumTarif  Int NOT NULL ,
        NumSaison Int NOT NULL
	,CONSTRAINT applique_PK PRIMARY KEY (NumLoc,NumTarif,NumSaison)

	,CONSTRAINT applique_Location_FK FOREIGN KEY (NumLoc) REFERENCES Location(NumLoc)
	,CONSTRAINT applique_Tarif0_FK FOREIGN KEY (NumTarif) REFERENCES Tarif(NumTarif)
	,CONSTRAINT applique_Saison1_FK FOREIGN KEY (NumSaison) REFERENCES Saison(NumSaison)
)ENGINE=InnoDB;

