//import { uuid } from 'uuidv4';
import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    ManyToOne, 
    JoinColumn 
} from 'typeorm'
// import AppointmentsRepository from '../repositories/AppointmentsRepository';
import User from './User';

// Tipos de relacionamentos
// Um para um (OneToOne)
// Um para muitos (OnyToMany)
// Muito para muitos (ManyToMany)

//KISS - Keep It Simple & Stupid - Mantenha Simples seu código

@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider_id: string;
    
    @ManyToOne (() => User)
    @JoinColumn({ name: 'provider_id'})
    provider: User;

    @Column('timestamp with time zone')
    date: Date;
        
    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // Este construtor não é usado no typeorm
    // constructor({provider, date}: Omit<Appointment, 'id'>) {
    //   this.id = uuid();
    //   this.provider = provider;
    //   this.date = date;  
    // }
}

export default Appointment;