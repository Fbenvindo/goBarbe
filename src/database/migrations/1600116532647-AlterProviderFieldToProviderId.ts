import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";
import Appointment from "../../models/Appointment";

export default class AlterProviderFieldToProviderId1600116532647 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'provider');
        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'provider_id',
            type:'uuid',
            isNullable: true, //Usado para o caso do usuário for excluído mas não podemos perder o histórico
        }),
        );
        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            name: 'AppointmentProvider',
            columnNames: ['provider_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //Neste caso, precisamos fazer o caminho reverso, pois o keyforeigner depende do resto
        await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');
        await queryRunner.dropColumn('appointments', 'provider_id');
        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'provider',
            type:'varchar',
        }))
    
    
    
    }

}
