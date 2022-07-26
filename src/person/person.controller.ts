require('dotenv').config();

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

const sql = require('mssql');
const sqlConfig = {
  user: process.env.SQLUSER,
  password: process.env.SQLPASS,
  database: process.env.SQLDATABASE,
  server: process.env.SQLSERVER,
  port: process.env.SQLPORT,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

@Controller('person')
export class PersonController {
  @Get()
  async getPerson() {
    return sql
      .connect(sqlConfig)
      .then(() => {
        return sql.query`exec allPerson`;
      })
      .then(async (result) => {
        return {
          status: 'success',
          data: await result.recordset,
          message: null,
        };
      })
      .catch((err) => {
        return {
          status: 'error',
          data: null,
          message: err,
        };
      });
  }

  @Get(':dni')
  async getPersonDni(@Param('dni') dni: string) {
    return sql
      .connect(sqlConfig)
      .then(() => {
        return sql.query`exec uniquePerson ${dni}`;
      })
      .then(async (result) => {
        return {
          status: 'success',
          data: await result.recordset[0],
          message: null,
        };
      })
      .catch((err) => {
        return {
          status: 'error',
          data: null,
          message: err,
        };
      });
  }

  @Post(':dni')
  insertPersonDni(@Body() user: CreateUserDto) {
    return sql
      .connect(sqlConfig)
      .then(() => {
        return sql.query`exec insertPerson ${user.name}, ${user.dni}, ${
          user.phone
        }, ${user.city}, ${user.province}, ${user.interests || '{}'}`;
      })
      .then(async (result) => {
        if (result.rowsAffected[0] === 0) throw 'Person not inserted';

        return {
          status: 'success',
          data: `User with dni: ${user.dni} inserted`,
          message: null,
        };
      })
      .catch((err) => {
        return {
          status: 'error',
          data: null,
          message: err,
        };
      });
  }

  @Put(':dni')
  updatePersonDni(@Body() user: CreateUserDto) {
    return sql
      .connect(sqlConfig)
      .then(() => {
        return sql.query`exec updatePerson ${user.name}, ${user.dni}, ${
          user.phone
        }, ${user.city}, ${user.province}, ${user.interests || '{}'}`;
      })
      .then(async (result) => {
        if (result.rowsAffected[0] === 0) throw 'Person not found';

        return {
          status: 'success',
          data: `User with dni: ${user.dni} updated`,
          message: null,
        };
      })
      .catch((err) => {
        return {
          status: 'error',
          data: null,
          message: err,
        };
      });
  }

  @Delete(':dni')
  deletePersonDni(@Param('dni') dni: string) {
    return sql
      .connect(sqlConfig)
      .then(() => {
        return sql.query`exec deletePerson ${dni}`;
      })
      .then(async (result) => {
        if (result.rowsAffected[0] === 0) throw 'Person not found';

        return {
          status: 'success',
          data: `User with dni: ${dni} deleted`,
          message: null,
        };
      })
      .catch((err) => {
        return {
          status: 'error',
          data: null,
          message: err,
        };
      });
  }
}
