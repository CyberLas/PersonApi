USE [client]
GO
/****** Object:  User [user]    Script Date: 26/07/2022 0:17:26 ******/
CREATE USER [user] FOR LOGIN [user] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[person]    Script Date: 26/07/2022 0:17:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[person](
	[name] [varchar](255) NOT NULL,
	[dni] [varchar](10) NOT NULL,
	[phone] [varchar](10) NOT NULL,
	[city] [varchar](255) NOT NULL,
	[province] [varchar](255) NOT NULL,
	[interests] [text] NOT NULL,
 CONSTRAINT [PK_person] PRIMARY KEY CLUSTERED 
(
	[dni] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[allPerson]    Script Date: 26/07/2022 0:17:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[allPerson] AS
 Begin
  SELECT * FROM [client].[dbo].[person] ;
   END
GO
/****** Object:  StoredProcedure [dbo].[deletePerson]    Script Date: 26/07/2022 0:17:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[deletePerson]
  @Dni varchar(10)
 as
	Begin
		DELETE FROM [client].[dbo].[person] WHERE dni=@Dni;
	END
GO
/****** Object:  StoredProcedure [dbo].[insertPerson]    Script Date: 26/07/2022 0:17:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[insertPerson]
  @Name varchar(255),
  @Dni varchar(10),
  @Phone varchar(10),
  @City varchar(255),
  @Province varchar(255),
  @Interests text
 as
	Begin
		INSERT INTO [client].[dbo].[person] (name, dni, phone, city, province, interests) 
		VALUES(@Name, @Dni, @Phone, @City, @Province , @Interests);
	END
GO
/****** Object:  StoredProcedure [dbo].[uniquePerson]    Script Date: 26/07/2022 0:17:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[uniquePerson]
  @Dni varchar(10)
 as
 Begin
  SELECT * FROM [client].[dbo].[person] WHERE dni= @Dni;
   END
GO
/****** Object:  StoredProcedure [dbo].[updatePerson]    Script Date: 26/07/2022 0:17:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[updatePerson]
  @Name varchar(255),
  @Dni varchar(10),
  @Phone varchar(10),
  @City varchar(255),
  @Province varchar(255),
  @Interests text
 as
	Begin
		UPDATE [client].[dbo].[person] SET name=@Name, phone=@Phone, city=@City, province=@Province , interests=@Interests WHERE dni=@Dni;
	END
GO
