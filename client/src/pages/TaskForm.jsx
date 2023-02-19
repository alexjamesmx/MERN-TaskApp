import { Formik, Form } from "formik"
import { createTaskRequest } from "../api/tasks.api.js"
function TaskForm() {
  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
      }}
      onSubmit={async (values, actions) => {
        console.log(values)
        try {
          const response = await createTaskRequest(values)
          console.log(response)
          actions.resetForm()
        } catch (e) {
          console.log(e)
        }
      }}
    >
      {({ handleChange, handleSubmit, values, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <title>Title</title>
          <input
            type="text"
            name="title"
            placeholder="Write a title"
            onChange={handleChange}
            value={values.title}
          />

          <label>Description</label>
          <textarea
            name="description"
            rows="3"
            onChange={handleChange}
            value={values.description}
          ></textarea>

          <button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Create Task"}
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default TaskForm
