"""empty message

Revision ID: 92c5999d968f
Revises: 44c08988ee26
Create Date: 2025-06-02 20:07:51.726595

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '92c5999d968f'
down_revision = '44c08988ee26'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('about', sa.String(), nullable=True))
        batch_op.drop_column('residence')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('residence', sa.VARCHAR(), autoincrement=False, nullable=True))
        batch_op.drop_column('about')

    # ### end Alembic commands ###
