"""empty message

Revision ID: b6808ce8c9d7
Revises: 704cb9a58414
Create Date: 2023-11-04 17:39:45.124856

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b6808ce8c9d7'
down_revision = '704cb9a58414'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_watched_movies',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('movie_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['movie_id'], ['movies.id'], name=op.f('fk_user_watched_movies_movie_id_movies')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_user_watched_movies_user_id_users'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_watched_movies')
    # ### end Alembic commands ###
