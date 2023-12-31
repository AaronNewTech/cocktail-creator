"""message

Revision ID: 2c0c27c3489a
Revises: a62a0baa3bca
Create Date: 2023-08-30 11:06:07.215972

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2c0c27c3489a'
down_revision = 'a62a0baa3bca'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('drinassociations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('drink_id', sa.Integer(), nullable=True),
    sa.Column('ingredient_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['drink_id'], ['drinks.id'], name=op.f('fk_drinassociations_drink_id_drinks')),
    sa.ForeignKeyConstraint(['ingredient_id'], ['ingredients.id'], name=op.f('fk_drinassociations_ingredient_id_ingredients')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('drinassociations')
    # ### end Alembic commands ###
