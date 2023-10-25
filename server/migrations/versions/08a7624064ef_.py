"""empty message

Revision ID: 08a7624064ef
Revises: c1d404f28f5e
Create Date: 2023-10-24 22:12:07.379798

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '08a7624064ef'
down_revision = 'c1d404f28f5e'
branch_labels = None
depends_on = None


def upgrade():
    conn = op.get_bind()
    inspector = sa.engine.reflection.Inspector.from_engine(conn)
    if 'movie_id' not in [col['name'] for col in inspector.get_columns('ratings')]:
        op.add_column('ratings', sa.Column('movie_id', sa.Integer, sa.ForeignKey('movies.id')))


def downgrade():
    op.drop_column('ratings', 'movie_id')
