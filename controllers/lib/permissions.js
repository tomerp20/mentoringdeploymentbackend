const permissions = [
    { id: 0, role: 'user' },
    { id: 1, role: 'admin' },
    { id: 2, role: 'finance' },
    { id: 4, role: 'marketing' },
    { id: 8, role: 'help_desk' }
]

module.exports.getPermissionsList = (permissionId) => {

    const map = {};

    permissions.forEach(pr => {
        if ((permissionId & pr.id) == pr.id) {
            map[pr.role] = true;
        }
    });

    return map;
    /*
        return {
            user: true,
            admin: true,
            marketing: true
        }
    */
}