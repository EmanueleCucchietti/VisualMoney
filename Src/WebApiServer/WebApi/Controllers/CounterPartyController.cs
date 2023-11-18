﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebApi.Models.Dto.CounterParty;
using WebApi.Services.CounterParty;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class CounterPartyController : ControllerBase
    {
        private readonly ICounterPartyService _counterPartyService;

        public CounterPartyController(ICounterPartyService counterPartyService)
        {
            _counterPartyService = counterPartyService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            if (!HttpContext.Items.ContainsKey("UserId")
                || HttpContext.Items["UserId"] is not int userId)
                return Unauthorized();

            var counterParties = await _counterPartyService.GetCounterParties(userId);

            return Ok(counterParties);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            if (!HttpContext.Items.ContainsKey("UserId")
                || HttpContext.Items["UserId"] is not int userId)
                return Unauthorized();

            var counterParty = await _counterPartyService.GetCounterParty(id);

            if (counterParty is null)
                return NotFound();

            return Ok(counterParty);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CounterPartyDto counterPartyDto)
        {
            if (!HttpContext.Items.ContainsKey("UserId")
                || HttpContext.Items["UserId"] is not int userId)
                return Unauthorized();

            await _counterPartyService.CreateCounterParty(userId, counterPartyDto);

            return Ok(counterPartyDto);
        }


        [HttpPut]
        public async Task<IActionResult> Put([FromBody] CounterPartyWithIdDto counterPartyDto)
        {
            if (!HttpContext.Items.ContainsKey("UserId")
                || HttpContext.Items["UserId"] is not int userId)
                return Unauthorized();

            await _counterPartyService.UpdateCounterParty(counterPartyDto);
            
            return Ok(counterPartyDto);
        }
    }
}