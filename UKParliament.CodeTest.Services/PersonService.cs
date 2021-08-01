using System.Linq;
using UKParliament.CodeTest.Data;

namespace UKParliament.CodeTest.Services
{
    public class PersonService : IPersonService
    {
        private readonly PersonManagerContext apiContext;

        public PersonService(PersonManagerContext apiContext)
        {
            this.apiContext = apiContext;
        }

        /// <summary>
        /// Gets all persons in database
        /// </summary>
        /// <returns></returns>
        public IQueryable<Person> GetAll()
        {
            try
            {
                return apiContext.GetAll().OrderBy(person => person.Name);
            }
            catch
            {
                throw;
            }

        }

        /// <summary>
        /// Gets person by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Person Get(int id)
        {
            try
            {
                return apiContext.GetAll().Where(p => p.Id == id).SingleOrDefault();
            }
            catch
            {
                throw;
            }

        }

        /// <summary>
        /// Adds person
        /// </summary>
        /// <param name="person"></param>
        /// <returns></returns>
        public int Add(Person person)
        {
            apiContext.Add(person);
            return apiContext.SaveChanges();
        }

        /// <summary>
        /// Updates person
        /// </summary>
        /// <param name="person"></param>
        /// <returns></returns>
        public int Update(Person person)
        {
            try
            {
                apiContext.Update<Person>(person);
                return apiContext.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

        /// <summary>
        /// Deletes person by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int Delete(int id)
        {
            try
            {
                var person = Get(id);
                if (person != null)
                    apiContext.Remove<Person>(person);
                return apiContext.SaveChanges();
            }
            catch
            {
                throw;
            }
        }
    }
}