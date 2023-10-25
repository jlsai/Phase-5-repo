"""${message}

Revision ID: ${up_revision}
Revises: ${down_revision | comma,n}
Create Date: ${create_date}

"""
from alembic import op
import sqlalchemy as sa
${imports if imports else ""}

# revision identifiers, used by Alembic.
revision = ${repr(up_revision)}
down_revision = ${repr(down_revision)}
branch_labels = ${repr(branch_labels)}
depends_on = ${repr(depends_on)}


def upgrade():
    conn = op.get_bind()
    inspector = sa.engine.reflection.Inspector.from_engine(conn)
    if 'movie_id' not in [col['name'] for col in inspector.get_columns('ratings')]:
        op.add_column('ratings', sa.Column('movie_id', sa.Integer, sa.ForeignKey('movies.id')))


def downgrade():
    op.drop_column('ratings', 'movie_id')
