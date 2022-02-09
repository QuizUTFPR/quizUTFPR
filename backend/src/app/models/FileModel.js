import Sequelize, { Model } from 'sequelize';
import fs from 'fs';
import path from 'path';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/${this.path}`;
          },
        },
      },
      {
        hooks: {
          beforeDestroy: (file) => {
            fs.unlinkSync(
              path.resolve(
                __dirname,
                '..',
                '..',
                '..',
                'tmp',
                'uploads',
                file.path
              )
            );
          },
        },
        sequelize,
        tableName: 'file',
        underscored: true,
      }
    );

    return this;
  }

  static associate() {}
}

export default File;
