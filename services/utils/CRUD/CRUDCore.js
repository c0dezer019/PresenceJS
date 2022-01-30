const db = require('../../database/models');
const s = require('../settings.js');

/*
* The intention of this is to create a contextual way for performing CRUD operations. If it doesn't exist, create it.
* If it exists, update it if values differ from existing. If the provided details are the same, return it. The only thing
* it will not do is automatically destroy model instances.
* */

class CRUDCore {
    _dataBuffer;
    model;

    constructor() {
        this.model = {
            _created: false,
            _type: null,
            construct: null,
        };
        this.autoGenerateNode = true;
    }

    get fetch() {
        return this.model;
    }

    // create
    create() {
        switch(this._dataBuffer._type) {
            case 'member':
                if (model.construct !== null || model._type !== 'guild') throw new Error('Need a guild to attach member to.');

                db
                    .member
                    .create(Object.entries(this._dataBuffer._dataValues).filter(([key]) => !key.startsWith('_')))
                    .then(member => {
                        model.construct.addMember(member);

                        if (this.autoGenerateNode) {
                            member.createNode({
                                memberId: member.id,
                                memberSnowflakeID: member.dataValues.snowflakeID,
                                guildSnowflakeID: model.model.dataValues.snowflakeID,
                                username: member.dataValues.username,
                                discriminator: member.dataValues.discriminator,
                                botAdmin: s.bot_owner === member.dataValues.snowflakeID,
                                nickname: this._dataBuffer._dataValues._nickname
                            });
                        }
                        this.model._created = true;
                        this.model._type = 'member';
                        this.model.construct = member
                    })
                    .catch(console.error);
                break;
            default:
                db[this._dataBuffer._type]
                    .create(Object.entries(this._dataBuffer._dataValues).filter(([key]) => !key.startsWith('_')))
                    .then(model => {
                        this.model.created = true;
                        this.model.construct = model;
                    })
                    .catch(console.error);
        }

    }

    // read
    guild(obj) {
        db
            .guild
            .findOne({
                where: obj,
                include: [{
                    model: db.member,
                    include: db.node,
                }]
            })
            .then(guild => {
                if (guild !== null) {
                    this.model.construct = guild;
                    this.model._type = 'guild';
                }
                else this._dataBuffer._dataValues = obj; this._dataBuffer._type = 'guild';
            })
            .catch(console.error);
    }

    member(obj) {
        db
            .member
            .findOne({
                where: obj,
                include: [db.node, db.guild]
            })
            .then(member => {
                if (member !== null) {
                    this.model.construct = member;
                    this.model._type = 'member';
                }
                else {
                    this._dataBuffer._dataValues = obj;
                    this._dataBuffer._type = 'member';
                }
            })
            .catch(console.error);

        return true;
    };

    node(obj){
        db
            .node
            .findOne({
                where: obj
            })
            .then(node => {
                if (node !== null) {
                    this.model.construct = node;
                    this.model._type = 'node';
                } else {
                    // if node isn't found, create it.
                    this.member(obj).create();
                }
            })
    }

    // update
    async update(newValues) {
        await this.model.construct.dataValues.foreach(([key]) => {
            this.model.construct.dataValues[key] = newValues[key];
        });

        await this.model.construct.save();
    }

    // delete
    async delete() {
        await this.model.construct.destroy();
    }
}

module.exports = new CRUDCore();
