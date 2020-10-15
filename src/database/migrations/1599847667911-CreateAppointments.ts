import { id } from "date-fns/locale";
// Criar nova migrations novo yarn typeorm migration:create -n CreateAppointments
// Ela pode ser alterada desde que ainda esteja somente na minha máquina
// Para desfazer a migration yarn typeorm migration:revert
// Para ver as migrations executadas yarn typeorm migration:show
// Para rodar a migration yarn typeorm migration:run

import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAppointments1599847667911 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    //Algo novo no banco
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'provider',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'date',
                        type: 'timestamp with time zone', //Válido para o Postgress
                        isNullable: false,                        
                    },
                    {
                        name: 'create_at',
                        type: 'timestamp', 
                        default: 'now()',                    
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp', 
                        default: 'now()',                    
                    },
                ],
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    //Desfazer e voltar banco anterior
        await queryRunner.dropTable('appointments');

    }
}
