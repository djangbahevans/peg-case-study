"""created payments table

Revision ID: 930b8323ddfd
Revises: 936111e7c749
Create Date: 2022-03-23 14:29:42.583744

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '930b8323ddfd'
down_revision = '936111e7c749'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('payments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('amoumt', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.TIMESTAMP(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('payments')
    # ### end Alembic commands ###
