using Microsoft.AspNetCore.Mvc;
using UKParliament.CodeTest.Data;
using UKParliament.CodeTest.Services;

namespace UKParliament.CodeTest.Web.Controllers
{
    [ApiController]
    [Route("api/person")]
    public class PersonController : Controller
    {
        private readonly IPersonService personService;

        /// <summary>
        /// Constructor accepts IPersonService
        /// </summary>
        /// <param name="personService"></param>
        public PersonController(IPersonService personService)
        {
            this.personService = personService;
        }

        /// <summary>
        /// Gets all persons in database
        /// </summary>
        /// <returns></returns>
        [HttpGet("")]
        public IActionResult Get()
        {
            return Ok(personService.GetAll());
        }

        /// <summary>
        /// Gets person by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public IActionResult Get(int id = 0)
        {
            return Ok(personService.Get(id));
        }

        /// <summary>
        /// Post - adds person to database
        /// </summary>
        /// <param name="person"></param>
        /// <returns></returns>
        [HttpPost("add")]
        public IActionResult Add(Person person)
        {
            personService.Add(person);
            return Ok(personService.GetAll());
        }

        /// <summary>
        /// Post - updates person in database
        /// </summary>
        /// <param name="person"></param>
        /// <returns></returns>
        [HttpPost("update")]
        public IActionResult Update(Person person)
        {
            personService.Update(person);
            return Ok(personService.Update(person));
        }

        /// <summary>
        /// Deletes person by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("delete/{id}")]
        public IActionResult Delete(int id)
        {
            return Ok(personService.Delete(id));
        }
    }
}
