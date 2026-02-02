import { MigrationInterface, QueryRunner } from 'typeorm';
export class InitDB1769953650417 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TYPE currency_type AS ENUM ('RUB', 'USD', 'EUR', 'KZT');
        CREATE TYPE payment_method AS ENUM ('sberbank_credit', 'alfa_click', 'phone_balance', 'bank_card', 'pay_in_installments', 'cash', 'pay_parts', 'spb', 'sberbank_business_online', 'electronic_certificate', 'yoomoney', 'apple_pay', 'google_pay', 'qiwi_wallet', 'sberpay', 't_pay', 'wechat', 'webmoney');
        CREATE TYPE payment_status AS ENUM ('pending', 'waiting_for_capture', 'succeeded', 'canceled');
        CREATE TYPE subscription_plan AS ENUM ('free', 'basic', 'standard', 'premium');
        CREATE TYPE webhook_event_type AS ENUM ('payment.waiting_for_capture', 'payment.succeeded', 'payment.canceled', 'payment_method.active', 'refund.succeeded', 'payout.succeeded', 'payout.canceled', 'deal.closed'); 
    `);
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS subscription (
                                                    id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
                                                    plan subscription_plan DEFAULT 'free'::subscription_plan NOT NULL,
                                                    start_date TIMESTAMP WITH TIME ZONE,
                                                    end_date TIMESTAMP WITH TIME ZONE,
                                                    user_id UUID
        );
        CREATE TABLE IF NOT EXISTS payment (
                                               id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
                                               amount NUMERIC NOT NULL,
                                               status payment_status NOT NULL,
                                               currency currency_type NOT NULL,
                                               created_at TIMESTAMP WITH TIME ZONE NOT NULL,
                                               payment_method payment_method NOT NULL,
                                               yookassa_payment_id UUID,
                                               subscription_id UUID,
                                               description varchar(255),
                                               confirmation_url varchar(255),
                                               FOREIGN KEY (subscription_id) REFERENCES subscription(id) ON DELETE CASCADE
        );
        CREATE TABLE IF NOT EXISTS notification (
                                                    id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
                                                    event webhook_event_type NOT NULL,
                                                    payment_id UUID,
                                                    FOREIGN KEY (payment_id) REFERENCES payment(id) ON DELETE CASCADE,
                                                    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
        );
    `);
    await queryRunner.query(`
        INSERT INTO subscription (id, plan, user_id) VALUES
            ('123e4567-e89b-12d3-a456-426614174000', 'free', '123e4567-e89b-12d3-a456-426614174002'),
            (uuid_generate_v4(), 'free', '123e4567-e89b-12d3-a456-426614174003');
    `);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS public.notification;
        DROP TABLE IF EXISTS public.payment;
        DROP TABLE IF EXISTS public.subscription;
        DROP TYPE IF EXISTS payment_method;
        DROP TYPE IF EXISTS currency_type;
        DROP TYPE IF EXISTS payment_status;
        DROP TYPE IF EXISTS subscription_plan;
    `);
  }
}
