import taskModel from '../models/task.js'

export const createTask = async (req, res) => {
    try {
        let { title, description, date } = req.body

        let userid = req.user._id

        if (!title || !description || !date) {
            return res.json({ success: false, message: "all fields are required" }).status(401)
        }

        let newTask = await new taskModel({
            title,
            description,
            completeTo: date,
            createdBy: userid
        }).save()

        return res.json({ success: true, message: "Task created successfully", newTask }).status(200)

    } catch (error) {

        return res.json({ success: false, message: "server error" }).status(500)
    }
}

export const updateTask = async (req, res) => {
    try {
        let id = req.params.id
        let { title, description, date } = req.body

        if (!title, !description, !date) {
            return res.json({ success: false, message: "all fields are required" }).status(401)
        }

        if (!id) {
            return res.json({ success: false, message: "id is required" }).status(401)
        }

        let updatedTask = await taskModel.findByIdAndUpdate(id, { $set: { title, description, date } }, { new: true })

        if (!updatedTask) {
            return res.json({ success: false, message: "server error" }).status(500)
        }

        return res.json({ success: true, message: "task updated successfully", updateTask }).status(200)

    } catch (error) {
        console.log("server error", error)
        return res.status(500).json({ success: false, message: "server error" })
    }
}

export const readTask = async (req, res) => {
    try {

        let userid = req.user._id

        let allTask = await taskModel.find({ createdBy: userid }).limit(30)

        if (!allTask || allTask.length == 0) {
            return res.json({ success: false, message: "No task found" }).status(404)
        }

        return res.json({ success: true, message: "all taskes feached successfully", allTask }).status(200)

    } catch (error) {

        return res.json({ success: false, message: "server error" }).status(500)
    }
}

export const deleteTask = async (req, res) => {
    try {
        let id = req.params.id

        if (!id) {
            return res.json({ success: false, message: "id is required" }).status(401)
        }

        let deletedTask = await taskModel.findByIdAndDelete(id)

        if (!deletedTask) {
            return res.json({ success: false, message: "task not found" }).status(404)
        }

        return res.json({ success: true, message: "task deleted successfully" }).status(200)

    } catch (error) {

        return res.json({ success: false, message: "server error" }).status(500)
    }
}

export const toggleComplete = async (req, res) => {
    try {
        let id = req.params.id

        if (!id) {
            return res.json({ success: false, message: "id is required" }).status(401)
        }

        let taskInDB = await taskModel.findById(id)

        if (!taskInDB) {
            return res.json({ success: false, message: "task not found" }).status(404)
        }

        let isCompleteTask = await taskModel.findByIdAndUpdate(taskInDB._id, { $set: { isComplete: !taskInDB.isComplete } }, { new: true })

        if (!isCompleteTask) {
            return res.json({ success: false, message: "task not found" }).status(404)
        }

        return res.json({ success: true, message: "task toggle successfully" }).status(200)

    } catch (error) {

        return res.json({ success: false, message: "server error" }).status(500)
    }
}
