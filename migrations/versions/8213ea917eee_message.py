"""message

Revision ID: 8213ea917eee
Revises: a4e1d72801d7
Create Date: 2023-09-26 14:01:17.705331

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8213ea917eee'
down_revision = 'a4e1d72801d7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('email', sa.String(), nullable=True))
        batch_op.drop_column('username')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('username', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('email')

    # ### end Alembic commands ###